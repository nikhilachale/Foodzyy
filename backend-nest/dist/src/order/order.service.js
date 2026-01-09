"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const crypto_1 = require("crypto");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(user, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const where = user.role === 'ADMIN'
            ? {}
            : { userId: user.id };
        return this.prisma.order.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                restaurant: true,
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
    }
    async create(user, dto) {
        if (!dto || !dto.restaurantId || !dto.items?.length) {
            return this.prisma.order.create({
                data: {
                    id: (0, crypto_1.randomUUID)(),
                    userId: user.id,
                    country: user.country,
                    status: 'CREATED',
                },
            });
        }
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: dto.restaurantId },
        });
        if (!restaurant) {
            throw new common_1.BadRequestException('Restaurant not found');
        }
        const menuItems = await this.prisma.menuItem.findMany({
            where: {
                id: { in: dto.items.map((i) => i.menuItemId) },
                restaurantId: dto.restaurantId,
            },
        });
        if (menuItems.length !== dto.items.length) {
            throw new common_1.BadRequestException('Some menu items are invalid');
        }
        const totalAmount = dto.items.reduce((sum, item) => {
            const menuItem = menuItems.find((m) => m.id === item.menuItemId);
            return sum + (menuItem?.price || 0) * item.quantity;
        }, 0);
        const orderId = (0, crypto_1.randomUUID)();
        return this.prisma.order.create({
            data: {
                id: orderId,
                userId: user.id,
                country: user.country,
                status: 'CREATED',
                restaurantId: dto.restaurantId,
                totalAmount,
                items: {
                    create: dto.items.map((item) => {
                        const menuItem = menuItems.find((m) => m.id === item.menuItemId);
                        return {
                            id: (0, crypto_1.randomUUID)(),
                            menuItemId: item.menuItemId,
                            quantity: item.quantity,
                            price: menuItem?.price || 0,
                        };
                    }),
                },
            },
            include: {
                restaurant: true,
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
    }
    async checkout(user, orderId) {
        if (user.role === 'MEMBER') {
            throw new common_1.ForbiddenException('Members cannot checkout');
        }
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException();
        if (user.role !== 'ADMIN' && order.country !== user.country) {
            throw new common_1.ForbiddenException('Cross-country access denied');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PLACED' },
            include: {
                restaurant: true,
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
    }
    async cancel(user, orderId) {
        if (user.role === 'MEMBER') {
            throw new common_1.ForbiddenException('Members cannot cancel orders');
        }
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException();
        if (user.role !== 'ADMIN' && order.country !== user.country) {
            throw new common_1.ForbiddenException('Cross-country access denied');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
            include: {
                restaurant: true,
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map