import random

def start_game(): 

    game_words = ("rock", "paper", "scissors")
    print("Welcome to Rock, Paper, Scissors Game!!!")

    while True:

        user_value = input("Enter rock, paper, or scissors: ").lower()

        if user_value not in game_words:
            print("Invalid input, enter a correct word")
            continue

        system_value = random.choice(game_words)

        print(f"You chose: {user_value}")
        print(f"Computer chose: {system_value}")

        if user_value == system_value:
            print("The game is a tie")

        elif (
            (user_value == "rock" and system_value == "scissors") or
            (user_value == "paper" and system_value == "rock") or
            (user_value == "scissors" and system_value == "paper")
        ):
            print("You have won!")

        else:
            print("System has won!")

        play_again = input("Do you want to play again? (yes/no): ").lower()

        if play_again != "yes":
            print("Thanks for playing the game")
            break

if __name__ == "__main__":
    start_game()
