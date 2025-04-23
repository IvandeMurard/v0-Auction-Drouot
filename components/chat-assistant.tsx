"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Send, Loader2, X, MessageSquare, MinusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/language-context"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatAssistant() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok || !response.body) {
        throw new Error("Failed to send message")
      }

      // Process the stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let assistantMessage = ""

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunk = decoder.decode(value)
        assistantMessage += chunk

        // Update the message in real-time
        setMessages((prev) => {
          const newMessages = [...prev]
          // Check if we already added an assistant message
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.role === "assistant") {
            // Update the existing message
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              content: assistantMessage,
            }
          } else {
            // Add a new assistant message
            newMessages.push({
              role: "assistant",
              content: assistantMessage,
            })
          }
          return newMessages
        })
      }
    } catch (err) {
      console.error("Chat error:", err)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chat.error"),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // If chat is not open, show the chat button
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg bg-[#C4151C] hover:bg-[#A01016]"
        data-chat-button
      >
        <MessageSquare size={24} />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] shadow-xl flex flex-col">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0 border-b">
        <CardTitle className="text-md font-medium">{t("chat.title")}</CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
            <MinusCircle size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-500"
            onClick={() => {
              setMessages([])
              setIsOpen(false)
            }}
          >
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <MessageSquare size={40} className="mb-2 opacity-50" />
            <p className="text-sm">{t("chat.welcome")}</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-[#C4151C] text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{t("chat.title")}</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder={t("chat.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-[#C4151C] hover:bg-[#A01016]"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </Card>
  )
}
