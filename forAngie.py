import tkinter as tk
from tkinter import font
import time
import threading

# Create the main window
root = tk.Tk()
root.title("When The Brain Is Too Tired, Oh...Love")
root.geometry("800x600")
root.configure(bg="#141414")  # Dark background for a modern, futuristic feel

# Setting the font and styling
font_title = ("Segoe UI", 35, "bold", "italic")
font_message = ("Segoe UI", 22, "bold")
font_heart = ("Arial", 60)

# Love messages to display
love_message = [
    "Dearest Angie, It's Late In The Night,...I'm Exhausted But..,",
    "Every moment with you is a cherished memory.",
    "You fill my heart with poetry,",
    "And I am the lucky poet to live this beautiful story.",
    "You are my dream, my joy, my reason to smile.",
    "So I wrote this code for You💖",
    "Forever, I will Cherish you, Angie. Good Night💖"
]

# Love icon (Heart) for the display
heart_icon = "❤️"

# Create label for name (Angie)
name_label = tk.Label(root, text="For Angie 💕", font=font_title, bg="#141414", fg="#ff4f80")
name_label.pack(pady=40)

# Create label for the love messages, initially empty
message_label = tk.Label(root, text="", font=font_message, bg="#141414", fg="#ffffff", justify="center", wraplength=700)
message_label.pack(pady=20)

# Function to animate text with smooth fade-in effect
def fade_in_message():
    for line in love_message:
        # Simulate a fade-in effect by gradually changing the text
        for i in range(0, 100, 5):
            message_label.config(text=line)
            message_label.config(fg=f"#{255-i:02x}{80+i:02x}{120-i:02x}")  # Gradually change color
            root.update()
            time.sleep(0.05)
        time.sleep(1)

# Function for the heart icon animation
def animate_heart():
    for _ in range(10):
        heart_label = tk.Label(root, text=heart_icon, font=font_heart, fg="white", bg="#141414")
        heart_label.place(relx=0.5, rely=0.6, anchor="center")
        heart_label.after(100, lambda: heart_label.place_forget())  # Heart disappears after a brief moment
        root.update()
        time.sleep(0.7)

# Run both animations in parallel (heart and messages)
def start_animations():
    threading.Thread(target=fade_in_message).start()
    threading.Thread(target=animate_heart).start()

# Start the animations
root.after(1000, start_animations)

# Run the GUI loop
root.mainloop()
