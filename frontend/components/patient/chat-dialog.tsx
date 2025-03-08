'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { X, Send, Circle } from "lucide-react";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentChat: {
    name: string;
    avatar: string;
    online: boolean;
  };
}

export function ChatDialog({ isOpen, onClose, currentChat }: ChatDialogProps) {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatMessage, setChatMessage] = useState("");

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, chatMessage]);
      setChatMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[448px] flex flex-col max-h-[600px]">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-purple-100">
              <AvatarImage src={currentChat.avatar} />
              <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{currentChat.name}</h3>
              <span className={text-sm flex items-center gap-1.5 ${currentChat.online ? 'text-green-600' : 'text-gray-500'}}>
                <Circle className={h-2.5 w-2.5 ${currentChat.online ? 'fill-green-500' : 'fill-gray-400'}} /> 
                {currentChat.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-gray-100 rounded-full h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50 flex flex-col gap-3 min-h-[350px]">
          {chatMessages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Start a conversation with {currentChat.name}
            </div>
          ) : (
            chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}}
              >
                {index % 2 !== 0 && (
                  <Avatar className="h-8 w-8 mr-2 self-end">
                    <AvatarImage src={currentChat.avatar} />
                    <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`
                  max-w-[70%] 
                  ${index % 2 === 0 
                    ? 'bg-purple-500 text-white rounded-t-2xl rounded-bl-2xl' 
                    : 'bg-white border rounded-t-2xl rounded-br-2xl shadow-sm'
                  }
                  p-3 relative group
                `}>
                  <p className="text-sm">{msg}</p>
                  <span className={`
                    text-[10px] absolute bottom-1 
                    ${index % 2 === 0 ? 'right-3 text-purple-100' : 'left-3 text-gray-400'}
                  `}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <Input 
              type="text" 
              placeholder="Type your message..." 
              value={chatMessage} 
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="rounded-full h-10 w-10 p-0 bg-purple-500 hover:bg-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}