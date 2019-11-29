Pull this onto an instance, set the environment variables in ~/.bashrc and then run
`docker run -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} -p 80:3000 -d shirajg/node-image-processor:latest` to start the container with AWS access
