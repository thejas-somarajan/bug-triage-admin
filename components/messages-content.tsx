"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, Smile, Paperclip, MessageCircle } from "lucide-react"
import { useState } from "react"

const messagesList = [
  {
    id: 1,
    name: "Sarah Jenkins",
    message: "Submitted the report.",
    time: "9:45 AM",
    avatar: "from-[#f59e0b] to-[#dc2626]",
  },
  {
    id: 2,
    name: "Engineering Team",
    message: "James: Meeting at 3 PM",
    time: "Yesterday",
    avatar: "from-[#3b82f6] to-[#1e40af]",
  },
  {
    id: 3,
    name: "David Miller",
    message: "Can we reschedule?",
    time: "Mon",
    unread: true,
    avatar: "from-[#10b981] to-[#059669]",
  },
  { id: 4, name: "Maya K.", message: "Thanks for the update!", time: "Mon", avatar: "from-[#8b5cf6] to-[#6d28d9]" },
]

const conversation = [
  {
    sender: "other",
    name: "Sarah Jenkins",
    message:
      "Hi, I have a question about my performance review for Q3. Is there a specific format I should follow for the self-assessment?",
    time: "9:41 AM",
    avatar: "from-[#f59e0b] to-[#dc2626]",
  },
  {
    sender: "self",
    message: "Sure, Sarah. I'm pulling up your file now. We actually have a new template for this quarter.",
    time: "9:43 AM",
  },
  {
    sender: "self",
    message: "Q3_Review_Template.pdf",
    file: true,
    fileSize: "2.4 MB",
    time: "9:44 AM",
  },
  {
    sender: "other",
    name: "Sarah Jenkins",
    message: "Got it, thanks! I'll submit the report by EOD.",
    time: "9:45 AM",
    avatar: "from-[#f59e0b] to-[#dc2626]",
  },
]

export function MessagesContent() {
  const [selectedChat, setSelectedChat] = useState(messagesList[0])

  return (
    <div className="flex h-screen">
      {/* Messages List */}
      <div className="w-96 bg-[#1e293b] border-r border-[#334155] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Messages</h2>
            <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb]">
              <MessageCircle size={18} />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
            <Input
              placeholder="Search people or teams..."
              className="w-full pl-10 bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#334155] px-6 pt-4">
          <button className="px-0 py-2 border-b-2 border-[#3b82f6] text-[#3b82f6] font-medium text-sm">All</button>
          <button className="px-6 py-2 text-[#94a3b8] font-medium text-sm hover:text-white">Teams</button>
          <button className="px-6 py-2 text-[#94a3b8] font-medium text-sm hover:text-white">Unread</button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {messagesList.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 border-b border-[#334155] text-left hover:bg-[#0f172a] transition-colors flex items-start gap-3 ${
                selectedChat.id === chat.id ? "bg-[#0f172a]" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${chat.avatar} flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium truncate">{chat.name}</p>
                  <p className="text-[#64748b] text-xs flex-shrink-0">{chat.time}</p>
                </div>
                <p className="text-[#94a3b8] text-sm truncate">{chat.message}</p>
              </div>
              {chat.unread && <div className="w-2 h-2 bg-[#3b82f6] rounded-full flex-shrink-0 mt-2"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0f172a]">
        {/* Chat Header */}
        <div className="bg-[#1e293b] border-b border-[#334155] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedChat.avatar}`}></div>
            <div>
              <p className="text-white font-medium">{selectedChat.name}</p>
              <p className="text-[#94a3b8] text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">
              Assign Issue
            </Button>
            <button className="text-[#94a3b8] hover:text-white">
              <Search size={20} />
            </button>
            <button className="text-[#94a3b8] hover:text-white">
              <div className="text-2xl">⋮</div>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center text-[#64748b] text-sm py-4">TODAY</div>

          {conversation.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "self" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "other" && (
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${msg.avatar} flex-shrink-0 mr-3`}></div>
              )}
              <div className={`flex flex-col ${msg.sender === "self" ? "items-end" : "items-start"}`}>
                {msg.sender === "other" && <p className="text-[#94a3b8] text-sm mb-1">{msg.name}</p>}
                {msg.file ? (
                  <a
                    href="#"
                    className="bg-[#3b82f6] text-white rounded-lg p-4 mb-1 flex items-center gap-3 hover:bg-[#2563eb]"
                  >
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-medium text-sm">{msg.message}</p>
                      <p className="text-xs text-blue-100">{msg.fileSize}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "self"
                        ? "bg-[#3b82f6] text-white rounded-br-none"
                        : "bg-[#1e293b] text-white rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                )}
                <p className="text-[#64748b] text-xs mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-[#1e293b] border-t border-[#334155] p-4">
          <div className="flex gap-3">
            <button className="text-[#94a3b8] hover:text-white">
              <Paperclip size={20} />
            </button>
            <Input
              placeholder="Type a message to Sarah..."
              className="flex-1 bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
            />
            <button className="text-[#94a3b8] hover:text-white">
              <Smile size={20} />
            </button>
            <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb]">
              <Send size={18} />
            </Button>
          </div>
          <p className="text-[#64748b] text-xs mt-2">Press Enter to send. Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
