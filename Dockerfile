
FROM openjdk:8-jdk-alpine as RUN

WORKDIR /opt/app

COPY spring-boot-react-websocket-api/pom.xml spring-boot-react-websocket-api/pom.xml
COPY spring-boot-react-websocket-api/src spring-boot-react-websocket-api/src

COPY spring-boot-react-websocket-client/pom.xml spring-boot-react-websocket-client/pom.xml
COPY spring-boot-react-websocket-client/src spring-boot-react-websocket-client/src
COPY spring-boot-react-websocket-client/public spring-boot-react-websocket-client/public
COPY spring-boot-react-websocket-client/package.json spring-boot-react-websocket-client/package.json

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline

RUN ./mvnw install -DskipTests

ARG JAR_FILE=/opt/app/spring-boot-react-websocket-api/target/*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java","-jar","/application.jar"]