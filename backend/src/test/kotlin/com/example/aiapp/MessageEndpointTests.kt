package com.example.aiapp

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import kotlin.test.assertEquals

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MessageEndpointTests {
    @Value("\${local.server.port}")
    private var port: Int = 0

    private fun send(body: String): HttpResponse<String> = HttpClient.newHttpClient().send(
        HttpRequest.newBuilder(URI("http://127.0.0.1:$port/messages"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(body)).build(),
        HttpResponse.BodyHandlers.ofString(),
    )

    @Test
    fun `message returns backend reply preserving the sentence`() {
        val response = send("""{"message":"Hello, backend!"}""")
        assertEquals(200, response.statusCode())
        assertEquals("""{"reply":"the backend received Hello, backend!"}""", response.body())
    }

    @Test
    fun `invalid messages are rejected`() {
        for (body in listOf("""{"message":"   "}""", """{"message":"${"a".repeat(2001)}"}""", "{}", "not json")) {
            assertEquals(400, send(body).statusCode())
        }
    }
}
