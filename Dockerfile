FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY app ./app
COPY public ./public
COPY next.config.ts .
COPY postcss.config.mjs .
COPY tsconfig.json .

RUN npm run build

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

CMD ["npm", "run", "start"]