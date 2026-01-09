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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async loginOrSignup(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            throw new common_1.BadRequestException('Invalid phone number. Must be at least 10 digits.');
        }
        let user = await this.prisma.user.findUnique({ where: { phone: cleanPhone } });
        let isNewUser = false;
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    phone: cleanPhone,
                    name: null,
                    role: 'MEMBER',
                    country: 'INDIA',
                },
            });
            isNewUser = true;
        }
        const payload = {
            sub: user.id,
            phone: user.phone,
            role: user.role,
            country: user.country,
        };
        return {
            access_token: this.jwt.sign(payload),
            isNewUser,
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                role: user.role,
                country: user.country,
            },
        };
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: dto.name,
                country: dto.country,
                role: dto.role,
            },
        });
        const payload = {
            sub: updatedUser.id,
            phone: updatedUser.phone,
            role: updatedUser.role,
            country: updatedUser.country,
        };
        return {
            access_token: this.jwt.sign(payload),
            user: {
                id: updatedUser.id,
                phone: updatedUser.phone,
                name: updatedUser.name,
                role: updatedUser.role,
                country: updatedUser.country,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map