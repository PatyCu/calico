package com.example.aiapp.conversation

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

data class MessageRequest(val message: String)
data class MessageResponse(val reply: String)

@RestController
class MessageController(private val messages: MessageService) {
    @PostMapping("/messages")
    fun send(@RequestBody request: MessageRequest): MessageResponse {
        if (request.message.isBlank() || request.message.length > 2000) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
        return MessageResponse(messages.reply(request.message))
    }
}
