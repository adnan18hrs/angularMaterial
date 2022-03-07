FROM node:10.9.0-alpine 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200 49153
CMD npm run start


# below command will run only inside workspace where our code is present(where dockerfile is present)
# to build docker container => docker build --tag=angularmaterial_dashboard .
# to run docker container => docker run -p 9091:4200 angularmaterial_dashboard
# here 9090 is port for container and 8080 is for java port

# to push docker image from local to dockerHUB ( below is the command)
# docker tag angularmaterial_dashboard 930469/angularmaterial_dashboard
# docker push 930469/angularmaterial_dashboard


# running container without angular project in local
# => docker pull 930469/angularmaterial_dashboard
# => docker run -p 9090:8080 angularmaterial_dashboard