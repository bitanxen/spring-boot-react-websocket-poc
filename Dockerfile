
FROM maven:3.6.3-jdk-8 as BUILD
WORKDIR /opt/app

COPY spring-boot-react-websocket-api/pom.xml spring-boot-react-websocket-api/pom.xml
COPY spring-boot-react-websocket-api/src spring-boot-react-websocket-api/src

COPY spring-boot-react-websocket-client/pom.xml spring-boot-react-websocket-client/pom.xml
COPY spring-boot-react-websocket-client/src spring-boot-react-websocket-client/src
COPY spring-boot-react-websocket-client/public spring-boot-react-websocket-client/public
COPY spring-boot-react-websocket-client/package.json spring-boot-react-websocket-client/package.json
COPY spring-boot-react-websocket-client/yarn.lock spring-boot-react-websocket-client/yarn.lock

COPY pom.xml .

RUN mvn clean install -DskipTests

FROM openjdk:8-jdk-alpine as RUN
WORKDIR /opt/app

ARG JAR_FILE=/opt/app/spring-boot-react-websocket-api/target/*.jar
COPY --from=BUILD ${JAR_FILE} /opt/app/application.jar
ENTRYPOINT ["java","-jar","/opt/app/application.jar"]