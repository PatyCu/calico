package com.example.aiapp

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HealthEndpointTests {
    @Value("\${local.server.port}")
    private var port: Int = 0

    @Test
    fun `health returns UP over HTTP`() {
        val response = HttpClient.newHttpClient().send(
            HttpRequest.newBuilder(URI("http://127.0.0.1:$port/health")).GET().build(),
            HttpResponse.BodyHandlers.ofString(),
        )
        assertEquals(200, response.statusCode())
        assertTrue(response.headers().firstValue("content-type").orElse("").startsWith("application/json"))
        assertEquals("{\"status\":\"UP\"}", response.body())
    }
}
