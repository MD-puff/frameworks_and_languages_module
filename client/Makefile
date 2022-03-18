#DOCKER_IMAGE:=client

#build:
#	docker build --tag ${DOCKER_IMAGE} .

#test:
#	docker run --rm ${DOCKER_IMAGE}

#DOCKER_IMAGE:=vue_nginx_test

run: vue.js
	python3 -m http.server 8001
vue.js:
	curl https://unpkg.com/vue@next -L -o vue.js

build:
	docker build --tag ${DOCKER_IMAGE} .
run_:
	docker run --rm --publish 8001:80 ${DOCKER_IMAGE}
