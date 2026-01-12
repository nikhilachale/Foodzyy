import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import prisma from "./db/prisma.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
// If using TypeScript source, prefer .ts extension for dev
// import resolvers from "./graphql/resolvers.ts";
const app = express();
const PORT = process.env.PORT || 3000;
// Log every route called
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});
app.use(cors());
app.use(express.json());
// JWT auth for GraphQL context
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
            req.user = decoded;
        }
        catch (e) {
            // ignore invalid token
        }
    }
    next();
});
// Remove REST API routes: all API is now handled by GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user = req.user
            ? {
                id: req.user.id || req.user.sub,
                role: req.user.role,
                country: req.user.country,
                phone: req.user.phone,
                name: req.user.name,
            }
            : null;
        return {
            prisma,
            user,
        };
    },
});
async function startServer() {
    await server.start();
    server.applyMiddleware({ app: app });
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map