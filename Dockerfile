FROM node:22-alpine

WORKDIR /app

COPY ./app .

RUN npm ci
RUN npm run build

FROM alpine:3

ARG PB_VERSION=0.34.2

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./pocketbase/pb_migrations /pb/pb_migrations
COPY ./pocketbase/pb_hooks /pb/pb_hooks
COPY --from=0 /app/dist/ /pb/pb_public/

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
