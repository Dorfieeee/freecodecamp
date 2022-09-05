#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

SOURCE_FILE="games.csv"
TEAMS_COUNT=0
GAMES_COUNT=0
INSERT_SUCCESS="INSERT 0 1"


# read source file line by line
while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  # skip the first / header's line
  if [[ $YEAR != "year" ]]
  then
    # insert teams, names must be unique so insertion of another team
    # with the same name throws an error which are silenced
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER';")
    if [[ -z $WINNER_ID ]]
    then
      INSERT_WINNER_RESULT=$($PSQL "INSERT INTO teams(name) VALUES ('$WINNER');")
      if [[ $INSERT_WINNER_RESULT == $INSERT_SUCCESS ]]
      then
        (( TEAMS_COUNT++ ))
      fi
    fi
     
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT';")
    if [[ -z $OPPONENT_ID ]]
    then
      INSERT_OPPONENT_RESULT=$($PSQL "INSERT INTO teams(name) VALUES ('$OPPONENT');")
      if [[ $INSERT_OPPONENT_RESULT == $INSERT_SUCCESS ]]
      then
        (( TEAMS_COUNT++ ))
      fi
    fi

    # get teams' ids

    if [[ -z $WINNER_ID ]]
    then
      WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER';")
    fi

    if [[ -z $OPPONENT_ID ]]
    then
      OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT';")
    fi

    # insert a game
    GAME_INSERT_RESULT=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS )")
    if [[ $GAME_INSERT_RESULT == $INSERT_SUCCESS ]]
    then
      (( GAMES_COUNT++ ))
    fi
  fi
done < $SOURCE_FILE