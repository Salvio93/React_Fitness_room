ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "3.3.4"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.5.0",
  "com.typesafe.akka" %% "akka-stream" % "2.7.0",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.5.0", // For JSON support
)

lazy val root = (project in file("."))
  .settings(
    name := "SmartGymBackEnd"
  )
