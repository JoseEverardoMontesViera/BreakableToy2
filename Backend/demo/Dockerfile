#FROM eclipse-temurin:23-jdk AS builder
#
#WORKDIR /app
#
#COPY . .
#
#RUN gradle assemble
#
#FROM eclipse-temurin:23-jre
#
#WORKDIR /app
#
#COPY --from=builder /app/target/*.jar app.jar
#
#EXPOSE 8080
#
#ENTRYPOINT ["java","-jar","app.jar"]

FROM eclipse-temurin:23-jdk AS build

WORKDIR /app

COPY build.gradle settings.gradle /app/

COPY gradle /app/gradle/

COPY gradlew /app/gradlew

COPY src /app/src/

RUN chmod +x /app/gradlew

RUN ./gradlew build --no-daemon


FROM eclipse-temurin:23-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/app.jar"]




