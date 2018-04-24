# Dentsu Aegis Tech Test

The code in this repo builds, tests and deploys a simple Node application using Jenkins, Docker and Kubernetes. As part of the test some assumptions were made:

 - No unit tests are run - assuming this happens somewhere else, before the code hits this pipeline
 - To keep it simple, the job runs on the Jenkins master, which has Packer, Docker and Kubectl already installed
 - The application has no dependencies, so there's no need to `npm install`

## Building
The code is packaged up in a Docker container, using `node:9.9.0-alpine` as base image. Packer builds a new image, copying in the code from the repo (being the app very minimalistic there are no external dependencies, so skipping the `npm install` step).
The image gets tagged locally using the `ci-` prefix in the name, which will be dropped once the image has passed the tests.

## Testing
The image is tested from a functional point of view, checking that node is listening on port `8080` and that the body contains a specific string (`Hello World`) as per the requirements (the container ID has been added to the string to demonstrate that the application is running on a cluster).

## Publishing
Once the image has successfully passed the test, it gets tagged with its full name `dentsuaegistechtest/dentsuaegistechtest:0.1.$BUILD_NUMBER` and pushed to Docker Hub

## Deployment
The application is deployed in a Kubernetes cluster running on Google Cloud, using three replicas behind a load balancer. Every successfull commit ends up with a deployment.
