/**
 * @file The file contains all the application logics.
 * @author Michele Greco <m.greco.informatics@gmail.com>
 * @version 1
 */

/* Constants */
const APP_NAME = "Dartsgood";
const ARCADE_MODE = "arcade";
const ARCADE_MODE_MENU_VOICE_NAME = "Arcade Info"

/** 
 * It returns a random number. If min and max are defiend, they are used to select a random number within a lower limit number and/or a higher limit number.
 * 
 * @param {number} [min = null] - Starting number for the interval.
 * @param {number} [max = null] - Ending number for the interval.
 * 
 * @return {number} - Random nunmber.
 */
function getRandomInt(min = null, max = null) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/** 
 * JavaScript implementation of the quicksort algorithm with the possibility of selection of the pivote choosing method.
 * 
 * @param {Object} data - The collection of data that must be sorted. It is an array of JavaScript objects that contains following information having theese indexes: "id", "score", "rankingPosition". 
 * @param {number} low - The starting index of the array subset.
 * @param {number} high - The ending index of the array subset.
 * @param {number} mode - Used to choose which method to use in the pivote selection. 0 for the selection of the element in the high position, 1 to select pivote randomly.
 * @param {string} sortingArrayElementIndex - The JavaScript object index considered for the sorting.
 * 
 * @function configurePartition()
 * @function quickSort()
 */
function quickSort(data, low, high, mode, sortingArrayElementIndex) {
    if (low < high) {
        let j = configurePartition(data, low, high, mode, sortingArrayElementIndex);
        quickSort(data, low, j - 1, mode, sortingArrayElementIndex);
        quickSort(data, j + 1, high, mode, sortingArrayElementIndex);
    }
}

/**
 * Configuration step used to chose the pivote befor begin the partition part of the quicksort.
 * 
 * @param {Object} data - The collection of data that must be sorted. It is an array of JavaScript objects that contains following information having theese indexes: "id", "score", "rankingPosition". 
 * @param {number} low - The starting index of the array subset.
 * @param {number} high - The ending index of the array subset.
 * @param {number} mode - Used to choose which method to use in the pivote selection. 0 for the selection of the element in the high position, 1 to select pivote randomly.
 * @param {string} sortingArrayElementIndex - The JavaScript object index considered for the sorting.
 * 
 * @function getRandomInt()
 * @function swap()
 * @function partition()
 * 
 * @return {number} - The sorted pivot index.
 */
function configurePartition(data, low, high, mode, sortingArrayElementIndex) {
    let pivotIndex;
    switch (mode) {
        case 0:
            pivotIndex = high;
            break;
        case 1:
            pivotIndex = getRandomInt(low, high);
            break;
    }
    swap(data, pivotIndex, low);
    return partition(data, low, high, sortingArrayElementIndex);
}

/**
 * Find the right place of the pivot element and return its index.
 * 
 * @param {Object} data - The collection of data that must be sorted. It is an array of JavaScript objects that contains following information having theese indexes: "id", "score", "rankingPosition". 
 * @param {number} low - The starting index of the array subset.
 * @param {number} high - The ending index of the array subset.
 * @param {string} sortingArrayElementIndex - The JavaScript object index considered for the sorting.
 * 
 * @function swap()
 * 
 * @return {number} j - The sorted pivot index.
 */
function partition(data, low, high, sortingArrayElementIndex) {
    let pivot = data[low];

    let i = low - 1;
    let j = high + 1;
    while (i < j) {
        do {
            i++;
        } while (data[i][sortingArrayElementIndex] <= pivot[sortingArrayElementIndex] && i < high)
        do {
            j--;
        } while (data[j][sortingArrayElementIndex] > pivot[sortingArrayElementIndex] && j > low);

        if (i < j) {
            swap(data, i, j);
        }
    }
    swap(data, low, j);
    return j;
}

/**
 * Swap the element in position i inside the data object with the element in position j inside the same data object.
 * 
 * @param {Object} data - The collection of data that must be sorted. It is an array of JavaScript objects that contains following information having theese indexes: "id", "score", "rankingPosition". 
 * @param {number} i - position of the first element to swap.
 * @param {number} j - positioin of the second element to swwap.
 */
function swap(data, i, j) {
    let temp = data[i];
    data[i] = data[j];
    data[j] = temp;
}

/* MAIN MECHANICS */

/** 
 * Check for an unfinished game.
 * 
 * In case of unfineshed game, a modal shows the possibility to continue the game or to start a new one.
 * In the latter case the local storage is cleaned.
 *
 * @function createResumeArcadeGameConfirmModal() - Create a confirm modal for resume the game.
 */
function checkUnfinishedGame() {
    let unfinishedGame = localStorage.getItem('game');
    if (unfinishedGame == undefined) {
        localStorage.clear();
    } else {
        switch (unfinishedGame) {
            case ARCADE_MODE:
                createResumeArcadeGameConfirmModal();
        }
    }
}

/** 
 * Create a confirm modal for the number of selected players.
 * 
 * Allows to move on to the next section or to choose the number of players again.
 * 
 * @param {string} numberOfPlayersLocalStorageID - Number of players choosen.
 * 
 * @function createConfirmModalStructure() - Creation of the confirm modal structure.
 * @function setConfirmModalConfirm() - Transition from the modal to next section after the confirmation of a game's option.
 * @function setConfirmModalCancel() -  Close the modal to return to the previous game screen.
 */
function createNumberOfPlayerConfirmModal(numberOfPlayersLocalStorageID) {
    let title = 'Confirm the selected number of players';
    let message = 'Are you sure you want to create ' + localStorage.getItem('numberOfPlayers') + ' players?'
    createConfirmModalStructure(title, message);

    let sectionToHideID = '#number-of-players-selection';
    let SectionToShowID = '#starting-score-selection';
    setConfirmModalConfirm(sectionToHideID, SectionToShowID);

    setConfirmModalCancel(numberOfPlayersLocalStorageID);
}

/** 
 * Create a confirm modal for the starting score selected.
 * 
 * Allows the option to move on to the next section or to choose the starting score again.
 * 
 * @param {string} StartingScoreLocalStorageID - Starting score choosen.
 * 
 * @function createConfirmModalStructure() - Creation of the confirm modal structure.
 * @function setConfirmModalConfirm() - Transition from the modal to next section after the confirmation of a game option.
 * @function setConfirmModalCancel() - Close the modal to return to the previous game screen.
 */
function createStartingScoreConfirmModal(StartingScoreLocalStorageID) {
    let title = 'Confirm the selected starting score';
    let message = 'Are you sure you want to begin with ' + localStorage.getItem('startingScore') + ' points?'
    createConfirmModalStructure(title, message);

    let sectionToHideID = '#starting-score-selection';
    let SectionToShowID = '#game-interface';
    setConfirmModalConfirm(sectionToHideID, SectionToShowID, setUpNewArcadeGame);

    setConfirmModalCancel(StartingScoreLocalStorageID);
}

/** 
 * Create a confirm modal for the new game.
 * 
 * Allows to choose whether to start a new game. In this case the local storage is cleaned up.
 * 
 * @function createConfirmModalStructure() - Creation of the confirm modal structure.
 * @function setConfirmModalConfirm() - Transition from the modal to next section after the confirmation of a game option.
 * @function setConfirmModalCancel() - Close the modal to return to the previous game screen. 
 */
function createNewGameConfirmModal() {
    let title = 'Start A New Game';
    let message = 'If you start a new game all the data about this game will be deleted and your progress will be lost.<br><string>Are you sure to start a new game?</strong>';
    createConfirmModalStructure(title, message, 'yes', 'no');

    let sectionToHideID = '#starting-score-selection, #game-interface, #player-wins';
    let SectionToShowID = '#number-of-players-selection';
    function onConfirmFunction() {
        clearLocalStorage();
        $('#new-score-form .form-error').addClass('d-none');
        $('#new-score-form input[type=text]').val('');
        $('.player-info-header p.tag').addClass('d-none')
        $('.game-over-ranking-scores-container').empty();
    }
    setConfirmModalConfirm(sectionToHideID, SectionToShowID, onConfirmFunction);

    setConfirmModalCancel("");
}

/** 
 * Create a confirm modal for delete the app data.
 * 
 * Allows to choose to delete all data about the app from the local storage.
 * 
 * @function createConfirmModalStructure() - Creation of the confirm modal structure.
 * @function setConfirmModalConfirm() - Transition from the modal to next section after the confirmation of a game option.
 * @function setConfirmModalCancel() - Close the modal to return to the previous game screen.
 */
function createDeleteAppDataConfirmModal() {
    let title = 'Delete App Data';
    let message = 'All data about this app will be deleted from the local storage.<br><strong>Do you want to procede?</strong>'
    createConfirmModalStructure(title, message, 'yes', 'no');

    let sectionToHideID = '#starting-score-selection, #game-interface, #player-wins';
    let SectionToShowID = '#number-of-players-selection';
    function onConfirmFunction() {
        clearLocalStorage();
        $('#new-score-form .form-error').addClass('d-none');
        $('#new-score-form input[type=text]').val('');
        $('.player-info-header p.tag').addClass('d-none')
        $('.game-over-ranking-scores-container').empty();
    }
    setConfirmModalConfirm(sectionToHideID, SectionToShowID, onConfirmFunction);

    setConfirmModalCancel();
}

/** 
 * Create a confirm modal for resume the game.
 * 
 * In the presence of an unfinished game, a modal is shown that allows the player 
 * to choose whether or not to continue the game.
 *
 * @function createConfirmModalStructure() - Creation of the confirm modal structure.
 * @function setConfirmModalConfirm() - Transition from the modal to next section after the confirmation of a game option.
 * @function setConfirmModalCancel() - Close the modal to return to the previous game screen. 
 */
function createResumeArcadeGameConfirmModal() {
    let title = 'Resume Game';
    let message = 'Found an unfinished ' + localStorage.getItem('game') + ' game, do you want to resume it?'
    createConfirmModalStructure(title, message, 'yes', 'no');

    setConfirmModalConfirm("", "", resumeArcadeGame);

    setConfirmModalCancel("", clearLocalStorage);
}

/** 
 * Continue an unfinished Arcade game.
 * 
 * The section of the game interface is shown, while the others are hidden.
 * The saved data is recovered.
 */
function resumeArcadeGame() {
    $('#number-of-players-selection, #starting-score-selection, #player-wins').addClass('d-none');
    $('#game-interface').removeClass('d-none');

    let activePlayerId = localStorage.getItem('activePlayer');
    updatePlayerPanel(activePlayerId);
}

/** 
 * Creation of the confirm modal structure.
 * 
 * @param {string} title - Title of the modal.
 * @param {string} message - Message of the modal.
 * @param {string} confirmButtonText - Text for the confirmation button.
 * @param {string} cancelButtonText - Text for the cancel button.
 */
function createConfirmModalStructure(title, message, confirmButtonText = "confirm", cancelButtonText = "cancel") {
    let confirmationModal = `
        <div class="confirmation-modal-container" data-confirm="">
            <div class="modal-content-container">
                <h2 class="section-title text-glow"></h2>
                <p></p>
                <div class="btn-group mr-2" role="group" aria-label="Second group">
                <button type="button" class="btn btn-success confirm-button"></button>
                <button type="button" class="btn btn-danger cancel-button"></button>
                </div>
            </div>
        </div>
    `;

    $('#confirmation-modals-container').append(confirmationModal);
    $('#confirmation-modals-container h2').html(title);
    $('#confirmation-modals-container p').html(message);
    $('#confirmation-modals-container button.confirm-button').html(confirmButtonText);
    $('#confirmation-modals-container button.cancel-button').html(cancelButtonText);
}

/** 
 * Close the modal to return to the previous game screen.
 * 
 * The item saved in the local storage from the previous selection is removed.
 * 
 * @param {string} localStorageId - Item saved in the local storage from the previous game's option.
 * @param {function} [onCancelFunction = null] - The function to call inside the body.
 */
function setConfirmModalCancel(localStorageId, onCancelFunction = null) {
    $('#confirmation-modals-container .confirmation-modal-container .cancel-button').click(function () {
        $(this).parents().eq(2).remove();
        localStorage.removeItem(localStorageId);
        if (onCancelFunction != null) {
            onCancelFunction();
        }
    });
}

/** 
 * Delete all the data from the LocalStorage.
 */
function clearLocalStorage() {
    localStorage.clear();
}

/** 
 * Transition from the modal to the next section after the confirmation of a game option.
 * 
 * The game option screen is hidden and the new one is shown.
 * 
 * @param {string} sectionToHideID - Game section to hide.
 * @param {string} SectionToShowID - Game section to show.
 * @param {function} [onConfirmFunction = null] - The function to call inside the body.
 */
function setConfirmModalConfirm(sectionToHideID, SectionToShowID, onConfirmFunction = null) {
    $('#confirmation-modals-container .confirmation-modal-container .confirm-button').click(function () {
        $(sectionToHideID).addClass('d-none');
        $(this).parents().eq(2).remove();
        $(SectionToShowID).removeClass('d-none');
        if (onConfirmFunction != null) {
            onConfirmFunction();
        }
    });
}

/** 
 * Select the number of players.
 * 
 * By clicking on the button corresponding to the number of players desired for the game, 
 *  a modal opens to confirm the game option selected.
 *
 * @function createNumberOfPlayerConfirmModal() - Create a confirm modal for the number of selected players.
 */
function selectNumberOfPlayers() {
    $('#number-of-players-selection').find('button').click(function () {

        let numberOfPlayersLocalStorageID = 'numberOfPlayers';
        localStorage.setItem(numberOfPlayersLocalStorageID, this.value);

        createNumberOfPlayerConfirmModal(numberOfPlayersLocalStorageID);
    });
}

/** 
 * Select the starting score.
 * 
 * By clicking on the button corresponding to the starting score desired for the game, 
 * a modal opens to confirm the game option selected.
 *
 * @function createStartingScoreConfirmModal() - Create a confirm modal for the starting score selected.
 */
function selectStartingScore() {
    $('#starting-score-selection').find('button').click(function () {

        let StartingScoreLocalStorageID = 'startingScore';
        localStorage.setItem(StartingScoreLocalStorageID, this.value);

        createStartingScoreConfirmModal(StartingScoreLocalStorageID)
    });
}

/** 
 * Setup new Arcade Game - Game screen setup.
 * 
 * The player interface is shown (active player with his starting score).
 * The rounds are set based on the number of players selected.
 *
 * @function setActivePlayer() - Set the active player.
 * @function updatePlayerPanel() - Show in the player panel the information about the specified player.
 */
function setUpNewArcadeGame() {
    localStorage.setItem('game', ARCADE_MODE);
    $('#game-interface').removeClass('d-none');

    for (i = 1; i <= localStorage.getItem('numberOfPlayers'); i++) {
        localStorage.setItem("player" + i + "Score", localStorage.getItem('startingScore'));
    }

    localStorage.setItem('turn', 1);
    setActivePlayer(1);
    updatePlayerPanel(1);
}

/** 
* Show in the player panel information about the specified player.
*
* @param {string} playerId - Id of the player for whome to show information.
*
* @function showPlayerInfo() - Loads player info in the player panel.
* @function showGameRanking() - Loads ranking info in the ranking panel.
*/
function updatePlayerPanel(playerId) {
    showPlayerInfo(playerId);
    showGameRanking();
    $('#new-score-form input').focus();

}

/**
 * Loads player info in the player panel.
 * 
 * @param {string} playerId - Id of the player for whome to show information. 
 * 
 * @function getPlayerInfo() - Creation of an object containing player information.
 * @function createRankingPositionString() - Create ranking position with the proper suffix.
 */
function showPlayerInfo(playerId) {
    let playerInfo = getPlayerInfo(playerId);
    $('#player-panel').attr('data-player-id', playerId);
    $('#player-panel .player-info-header h3 span').html(playerId);
    $('#player-panel p.score').html(playerInfo['score']);
    let playerRankingPosition = createRankingPositionString(parseInt(playerInfo['rankingPosition']));
    if (localStorage.getItem('isRankingDefined') !== null) {
        $('.player-info-header p.tag').removeClass('d-none');
        $('#player-panel .player-info-header p.tag span').html(playerRankingPosition);
    }
}

/**
 * Loads ranking info in the ranking panel.
 * 
 * @function getPlayersInfo - Creation of an object containing player information.
 */
function showGameRanking() {
    let playersInfo = getPlayersInfo();
    $('.ranking-container ul').empty();
    playersInfo.forEach(playerInfo => {
        let additionalClasses = "";
        if (playerInfo['id'] == localStorage.getItem('activePlayer')) {
            additionalClasses = "active-player";
        }
        let playerRankingInfo;
        if (localStorage.getItem('isRankingDefined') === "true") {
            let formattedRankingPosition = createRankingPositionString(parseInt(playerInfo['rankingPosition']));
            playerRankingInfo = '<li class="' + additionalClasses + '"><span class="rankingPosition">' + formattedRankingPosition + '</span> <span class="player-id">Player #' + playerInfo['id'] + '</span> <span class="score">' + playerInfo['score'] + ' points</span></li>';
        } else {
            playerRankingInfo = '<li class="' + additionalClasses + '"><span class="rankingPosition">Unranked</span> <span class="player-id">Player #' + playerInfo['id'] + '</span> <span class="score">' + playerInfo['score'] + ' points</span></li>';
        }
        $('.ranking-container ul').append(playerRankingInfo);
    });
}

/**
 * Creation of an object containing the information about all players of the game.
 * 
 * Based on the number of players selected, a sorted array of JavaScript objects is created according to the score of each individual player and to the id number.
 * 
 * @function Quicksort() - Sorting the player array by score. 
 * 
 * @return {Array.<Object>} playersInformation - An array of objects sorted by players scores and index.
 */
function getPlayersInfo() {
    let playersInformation = [];
    for (let i = 1; i <= localStorage.getItem('numberOfPlayers'); i++) {
        playersInformation.push(getPlayerInfo(i));
    }
    let low = 0;
    let high = playersInformation.length - 1;
    quickSort(playersInformation, low, high, 1, 'score');
    playersInformation = sortPlayersInfoSameScoreSubsets(playersInformation)
    return playersInformation
}

/**
 * Get the information by a single player.
 * 
 * Creation of a JavasScript object containing player information (id, score, ranking position).
 * 
 * @param {string} playerId - The specific player for whom the information is needed.
 * 
 * @return {Object} playerInfo - An object containing a player's information.
 */
function getPlayerInfo(playerId) {
    let playerInfo = { "id": parseInt(playerId), "score": parseInt(localStorage.getItem('player' + playerId + 'Score')), "rankingPosition": localStorage.getItem('player' + playerId + 'RankingPosition') };
    return playerInfo;
}

/**
 * Submit the score.
 * 
 * When a player submits his score the system verify the correct formatting and data is updated.
 *  
 * @function preventDefault() - Prevent the default behaviour of the event.
 * @function updatePlayerScore() - Check right formatting of the input and update player data.
 */
function submitScore() {
    $('#new-score-form button[type="submit"]').click(function (event) {
        event.preventDefault();
        updatePlayerScore();
    });
}

/**
 * Update player information.
 * 
 * Updates the score in the local storage for the specified player.
 * 
 * @param {string} playerId - Specify the player for whom execute the instructions.
 * @param {string} playerScore - Player's score.
 */
function updatePlayerInfo(playerId, playerScore) {
    localStorage.setItem('player' + playerId + 'Score', playerScore);
}

/**
 * Update the player ranking position data.
 * 
 * @function getPlayersInfo() - Get information about all players.
 * @function updatePlayersRankingPosition() - Update player ranking data in the local storage.
 */
function updateRanking() {
    let playersInformation = getPlayersInfo();
    updatePlayersRankingPosition(playersInformation);
}

/**
 * Check the state of the game and allow the progress of the entire game.
 * 
 * @function showPlayerWinsSection() - Show the game over page when one player reaches 0 points.
 * @function showGameOverRanking() - Show the game over players ranking.
 * @function clearLocalStorage() - Delete all the data from the LocalStorage.
 * @function updatePlayerPanel() - Update the information for the specified player in the player panel portion of the screen.
 */
function updateGame() {
    let numberOfPlayers = localStorage.getItem('numberOfPlayers');
    let lastActivePlayerId = parseInt($('#game-interface #player-panel').attr('data-player-id'));

    let activePlayerId;
    if (lastActivePlayerId + 1 <= numberOfPlayers) {
        activePlayerId = lastActivePlayerId + 1;
    } else {
        activePlayerId = 1;
    }

    localStorage.setItem('activePlayer', activePlayerId);

    let lastActivePlayerScore = parseInt(localStorage.getItem('player' + lastActivePlayerId + 'Score'));
    if (lastActivePlayerScore === 0) { // game over
        $('#game-interface').addClass('d-none');
        $('#player-wins').removeClass('d-none');
        let winnerPlayerId = lastActivePlayerId;
        showPlayerWinsSection(winnerPlayerId);
        showGameOverRanking();
        clearLocalStorage();
    } else {
        let turn = parseInt(localStorage.getItem('turn')) + 1;
        localStorage.setItem('turn', turn);
        if (turn == 2) {
            localStorage.setItem('isRankingDefined', 'true');
        }
        updatePlayerPanel(activePlayerId);
    }
}

/**
 * Show the game over players ranking.
 * 
 * @param {string} winnerPlayerId - Specify the player that wins the game.
 */
function showPlayerWinsSection(winnerPlayerId) {
    $('#game-interface').addClass('d-none');
    $('#player-wins').removeClass('d-none');
    $('#player-wins h2 span').html(winnerPlayerId);
}

/**
 * Get user score input, do verification, updates the player score and updates local storage data.
 * @function updateRanking() -  Update the player ranking position data.
 * @function updateGame() - Check the state of the game and allow the progress of the entire game.
 */
function updatePlayerScore() {
    // get value from player score input field
    let newScoreString = $('#new-score-form input[type="text"]').val();
    let newScore = parseInt(newScoreString);
    if (isNaN(newScore) || newScore < 0 || newScore > 180 || newScoreString.match(/\D/)) {
        $('#new-score-form .form-error').removeClass('d-none');
        $('#new-score-form .form-error').html('The score must be an integer between 0 and 180 included.')
    } else {
        $('#new-score-form .form-error').addClass('d-none');
        $('#new-score-form input[type="text"]').val(""); // clean the input field
        // Update player score using the read throw score
        let playerId = $('#player-panel').attr('data-player-id');
        let updatedScore = localStorage.getItem("player" + playerId + "Score") - newScore;
        if (updatedScore >= 0) {
            localStorage.setItem("player" + playerId + "Score", updatedScore);
        }

        updateRanking();
        updateGame();
    }
}

/** 
 * Set the active player.
 * 
 * In the local storage the key "active player" is set with the value corresponding to the player's turn.
 *
 * @param {string} playerId - Specify the player to set as active. 
 */
function setActivePlayer(playerId) {
    localStorage.setItem('activePlayer', playerId);
}

/**
 * Organizes all players info in subsets of players that have the same score.
 * 
 * @param {Array <Object>} playersInfo - Info about all players of the game. 
 * 
 * @return {Array <Object>} playersInfoSubsets - Array organized in subset of players having the same score.
 */
function getSameScorePlayerInfoSubsets(playersInfo) {
    let firstElement = playersInfo[0];
    let playersInfoSubsets = [[firstElement]];
    let subArrayPositionSelector = 0;

    let previousPlayerScore = firstElement['score'];

    for (let index = 1; index < playersInfo.length; index++) {
        const element = playersInfo[index];
        actualPlayerScore = element['score']

        if (actualPlayerScore == previousPlayerScore) {
            playersInfoSubsets[subArrayPositionSelector].push(element);
        } else {
            subArrayPositionSelector++;
            playersInfoSubsets.push([element]);
        }

        previousPlayerScore = actualPlayerScore;
    }

    return playersInfoSubsets;
}

/**
 * Sort individual subsets of players with the same score by id number organizing them by ascending order.
 * 
 * @param {Array.<Object>} playersInfo
 * 
 * @function quickSort() - Sort player info.
 * 
 * @return {Array.<Object>} sortedPlayerInfo - Players info sorted by score and id number.
 */
function sortPlayersInfoSameScoreSubsets(playersInfo) {
    let playersInfoSubsets = getSameScorePlayerInfoSubsets(playersInfo);
    let sortedPlayerInfo = [];
    playersInfoSubsets.forEach(playersInfoSubset => {
        if (playersInfoSubset.length > 1) {
            quickSort(playersInfoSubset, 0, playersInfoSubset.length - 1, 1, 'id');

            playersInfoSubset.forEach(playerInfo => {
                sortedPlayerInfo.push(playerInfo);
            });

        } else {
            sortedPlayerInfo.push(playersInfoSubset[0]);
        }
    });
    return sortedPlayerInfo;
}

/**
 * Update the players ranking position inside the LocalStorage.
 * 
 * @param {Array.<Object>} playersInfo - All info about the players of the game.
 */
function updatePlayersRankingPosition(playersInfo) {
    let lastExaminedScore = null;
    let rankingPosition = 1;
    for (let index = 0; index < playersInfo.length; index++) {
        let playerInfo = playersInfo[index];
        let score = playerInfo['score'];
        let id = playerInfo['id'];
        if (index === 0) {
            lastExaminedScore = score;
        }

        if (lastExaminedScore != score) {
            rankingPosition++;
        }

        localStorage.setItem('player' + id + 'RankingPosition', rankingPosition);

        if (index !== 0) {
            lastExaminedScore = score;
        }
    }
}

/**
 * Create ranking position.
 * 
 * Based on the player's ranking number, the suffix corresponding to his position is added.
 * 
 * @param {number} rankingPositionNumber 
 * 
 * @return {string} rankingPositionString.
 */
function createRankingPositionString(rankingPositionNumber) {
    let rankingPositionString = "";
    switch (rankingPositionNumber) {
        case 1:
            rankingPositionString = rankingPositionNumber + 'st';
            break;
        case 2:
            rankingPositionString = rankingPositionNumber + 'nd';
            break;
        case 3:
            rankingPositionString = rankingPositionNumber + 'rd';
            break;
        default:
            rankingPositionString = rankingPositionNumber + 'th';
    }
    return rankingPositionString;
}

/**
 * Show the ranking in the game over section when a player wins the game.
 * 
 * @function getPlayersInfo() - Creation of an object containing the information about all players of the game.
 */
function showGameOverRanking() {
    let playersInfo = getPlayersInfo();
    playersInfo.forEach((element, index) => {
        let playerPosition = localStorage.getItem('player' + element['id'] + 'RankingPosition');
        let score = `
            <div class="ranking-score-container">
                <span class="position">${playerPosition}</span>
                <span class="key">Player #${element['id']}</span>
                <span class="value">${index == 0 ? 'Wins' : element['score'] + ' points'}</span>
            </div>                
        `;
        let selector = "#player-wins .game-over-ranking-scores-container";
        $(selector).append(score);
        if (index == 0) {
            $(selector + " .ranking-score-container").addClass('winner');
            $(selector + " .ranking-score-container span.value").addClass('text-glow');
        }
    });
}

/**
 * When a player click on the menu voice "New Game" a confirm modal was created. 
 * The player can choose to to start a new game and in this case the Local Storage is cleaned up.
 * 
 * @function clearLocalStorage() - Delete all the data from the LocalStorage.
 */
function startNewGame() {
    $('#new-game-menu-voice').click(function () {
        createNewGameConfirmModal();
    });
}

/**
 * When a player click on the menu voice "Delete App Data" a confirm modal was created.
 * The player can choose to to delete the app data.
 * 
 * @function createDeleteAppDataConfirmModal() - Create a confirm modal for delete the app data.
 */
function delleteAppData() {
    $('#delete-app-data-menu-voice').click(function () {
        createDeleteAppDataConfirmModal();
    });
}

$(document).ready(function () {

    // Initial App Configuration
    $('header h1').html(APP_NAME);
    $('nav a.navbar-brand').text(APP_NAME);

    checkUnfinishedGame();

    delleteAppData();

    selectNumberOfPlayers();

    selectStartingScore();

    submitScore();

    startNewGame();

});

