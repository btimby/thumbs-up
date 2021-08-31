DOCKER_COMPOSE=docker-compose

node_modules: package.json
	npm i

deps: node_modules

test: deps
	npm run test

build:
	${DOCKER_COMPOSE} build

run: build
	${DOCKER_COMPOSE} start