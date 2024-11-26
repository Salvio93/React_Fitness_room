import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.model.StatusCodes
import akka.stream.ActorMaterializer
import scala.concurrent.ExecutionContext
import scala.io.StdIn


import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

final case class DataResponse(page: Int, dataType: String, frequence: String, values: Seq[Int])
object JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val dataResponseFormat: RootJsonFormat[DataResponse] = jsonFormat4(DataResponse.apply)
}



object AkkaHttpServer extends App {

  implicit val system: ActorSystem = ActorSystem("akka-http-server")
  implicit val materializer: ActorMaterializer = ActorMaterializer()
  implicit val executionContext: ExecutionContext = system.dispatcher

  def generateData(page: Int, dataType: String, frequence: String): List[Int] = {
    frequence match {
      case "yearly" =>
        List(page,2,3,4,5,6,7,8,9,10,11,12)
      case "monthly" =>
        List(page,2,3,4,5,6,7,8,9,10,11,12)
      case "weekly" =>
        List(page,2,3,4,5,6,7,8,9,10,11,12)
      case "dayly" =>
        List(page,2,3,4,5,6,7,8,9,10,11,12)
      case _ =>
        List()
    }
  }
  // Define the route
  val route =
    path("api" / "data") {
      get {
        parameters("page".as[Int], "dataType", "frequence") { (page, dataType, frequence) =>
          val data = generateData(page, dataType, frequence)
          complete((StatusCodes.OK, data.mkString(",")))
        }
      }
    }

  // Start the server
  val bindingFuture = Http().newServerAt("0.0.0.0", 9090).bind(route)
  println(s"Server online at http://localhost:9090/\nPress RETURN to stop...")
  StdIn.readLine() // Keep the server running until user presses return
  bindingFuture
    .flatMap(_.unbind()) 
    .onComplete(_ => system.terminate()) 
}
