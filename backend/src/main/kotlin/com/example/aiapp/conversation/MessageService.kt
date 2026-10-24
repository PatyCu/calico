package com.example.aiapp.conversation

import org.springframework.stereotype.Service

@Service
class MessageService {
    fun reply(message: String): String = "the backend received $message"
}
