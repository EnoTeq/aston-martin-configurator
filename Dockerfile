# base node image
# FROM mcr.microsoft.com/playwright:v1.32.0-focal as base
FROM node:18.15.0 as base

# set for base and all layer that inherit from it
ENV NODE_ENV production
# ENV PLAYWRIGHT_BROWSERS_PATH="/ms-playwright"
ENV PLAYWRIGHT_BROWSERS_PATH=0

RUN apt-get update && apt-get install -y unzip

RUN useradd -ou 0 -g 0 --create-home -d /home/myuser myuser

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /home/myuser/myapp

ADD package.json package-lock.json .npmrc ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /home/myuser/myapp

COPY --from=deps /home/myuser/myapp/node_modules /home/myuser/myapp/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /home/myuser/myapp

COPY --from=deps /home/myuser/myapp/node_modules /home/myuser/myapp/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV PORT="8080"
ENV NODE_ENV="production"

WORKDIR /home/myuser/myapp

COPY --from=production-deps /home/myuser/myapp/node_modules /home/myuser/myapp/node_modules

COPY --from=build /home/myuser/myapp/build /home/myuser/myapp/build
COPY --from=build /home/myuser/myapp/public /home/myuser/myapp/public
COPY --from=build /home/myuser/myapp/package.json /home/myuser/myapp/package.json
COPY --from=build /home/myuser/myapp/start.sh /home/myuser/myapp/start.sh

USER myuser
ENV PLAYWRIGHT_BROWSERS_PATH=0
RUN npx playwright install --with-deps chromium

ENTRYPOINT [ "./start.sh" ]
