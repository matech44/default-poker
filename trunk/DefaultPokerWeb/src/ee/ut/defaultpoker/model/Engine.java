package ee.ut.defaultpoker.model;

import java.util.ArrayList;
import java.util.List;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;
import ee.ut.defaultpoker.evaluation.Hand;
import ee.ut.defaultpoker.model.info.GameInfo;
import ee.ut.defaultpoker.model.info.GameInfoContainer;
import ee.ut.defaultpoker.model.info.GameInfoFactory;

/**
 * @author Default Name Engine class defines game logic
 */
public class Engine {

	/**
	 * Describes which player can call methods
	 */
	private int currentPlayerId;

	/**
	 * Player who wins
	 */
	private int winnerPlayerId;

	/**
	 * Can player check at this stage?
	 */
	private boolean checkEnabled = false;

	/**
	 * Bet that has to be bought
	 */
	private int betAmount;

	/**
	 * Default small blind amount
	 */
	private int smallBlind = 5;

	/**
	 * Default big blind amount
	 */
	private int bigBlind = 10;

	/**
	 * Amount of chips on the table
	 */
	private int pot;

	/**
	 * Community cards
	 */
	private Card[] tablecards = new Card[5];

	/**
	 * Cards used during one hand game
	 */
	private Deck deck = new Deck();

	/**
	 * List of all players who have joined the game
	 */
	private List<Player> players = new ArrayList<Player>();

	/**
	 * Factory that creates GameInfo objects for sending to UIs
	 * 
	 * @see GameInfoFactory.java
	 */
	private GameInfoFactory infoFactory;

	/**
	 * Holds all GameInfo objects - UI makes calls to pop desired game info
	 * 
	 * @see GameInfoContainer.java
	 */
	private GameInfoContainer infoContainer;

	/**
	 * Constants used to define current round of the game contains
	 * <code>getName()</code> method to return round name as a String
	 */
	public enum Round {
		SETUP("Setup"), PREFLOP("Preflop"), FLOP("Flop"), TURN("Turn"), RIVER(
				"River"), CLOSING("Closing"), BETWEEN_HANDS("Between hands");

		private String name;

		private Round(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}
	}

	/**
	 * Holds current round constant
	 */
	Round round;

	/**
	 * Empty arguments constructor called only in PokerServlet init method
	 * 
	 * @see PokerServlet.java
	 */
	public Engine() {
		currentPlayerId = 0;

		infoFactory = new GameInfoFactory();
		infoContainer = new GameInfoContainer();

		setNewRound(Round.SETUP);
	}

	// Following methods are used mainly for testing in engineTest.java
	public int getCurrentPlayerId() {
		return currentPlayerId;
	}

	public void setCurrentPlayerId(int currentPlayerId) {
		this.currentPlayerId = currentPlayerId;
	}

	public int getWinnerPlayerId() {
		return winnerPlayerId;
	}

	public void setWinnerPlayerId(int winnerPlayerId) {
		this.winnerPlayerId = winnerPlayerId;
	}

	public boolean isCheckEnabled() {
		return checkEnabled;
	}

	public void setCheckEnabled(boolean checkEnabled) {
		this.checkEnabled = checkEnabled;
	}

	public int getBetAmount() {
		return betAmount;
	}

	public void setBetAmount(int betAmount) {
		this.betAmount = betAmount;
	}

	public int getSmallBlind() {
		return smallBlind;
	}

	public void setSmallBlind(int smallBlind) {
		this.smallBlind = smallBlind;
	}

	public int getBigBlind() {
		return bigBlind;
	}

	public void setBigBlind(int bigBlind) {
		this.bigBlind = bigBlind;
	}

	public int getPot() {
		return pot;
	}

	public void setPot(int pot) {
		this.pot = pot;
	}

	public Card[] getTablecards() {
		return tablecards;
	}

	public void setTablecards(Card[] tablecards) {
		this.tablecards = tablecards;
	}

	public Deck getDeck() {
		return deck;
	}

	public void setDeck(Deck deck) {
		this.deck = deck;
	}

	public List<Player> getPlayers() {
		return players;
	}

	public Player getFirstPlayer() {
		return players.get(0);
	}

	public void setPlayers(Player player) {
		this.players.add(player);
	}

	public int getPlayersSize() {
		return this.players.size();
	}

	public GameInfoFactory getInfoFactory() {
		return infoFactory;
	}

	public void setInfoFactory(GameInfoFactory infoFactory) {
		this.infoFactory = infoFactory;
	}

	public GameInfoContainer getInfoContainer() {
		return infoContainer;
	}

	public void setInfoContainer(GameInfoContainer infoContainer) {
		this.infoContainer = infoContainer;
	}

	public Round getRound() {
		return round;
	}

	public void setRound(Round round) {
		this.round = round;
	}

	// END OF TEST METHODS

	/**
	 * Called from UI to join game
	 * 
	 * @param name
	 * @param session
	 */
	public void createPlayer(String name, String session) {
		Player player = new Player(name);
		player.setSession(session);
		players.add(player);

		// update UI - new player has joined
		newPlayerAddedEvent(session);
		systemMessageEvent("Player " + name + " joined game");
	}

	/* ==============PLAYER INTERACTION============ */

	/**
	 * Called from UI to fold player hand
	 * 
	 * @param session
	 */
	public void playerFold(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()) {
			getPlayerBySession(session).setFold(true);
			getPlayerBySession(session).setHasActed(true);
			getPlayerBySession(session).setActive(false);

			// update UI - player has folded
			playerFoldEvent(getPlayerBySession(session));
			systemMessageEvent("Player "
					+ getPlayerBySession(session).getName() + " folded");

			selectNextPlayerOrRound();
		} else {
			systemMessageEvent(session,
					"You can not act right now - your session id is " + session);
		}
	}

	/**
	 * Called from UI - player buys highest bet
	 * 
	 * @param session
	 */
	public void playerCall(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()) {

			int previousBet = getPlayerBySession(session).getBet();
			int newBet = getHighestBet() - previousBet;

			increasePlayerBet(session, newBet);
			getPlayerBySession(session).setHasActed(true);

			systemMessageEvent("Player "
					+ getPlayerBySession(session).getName() + " folded");

			selectNextPlayerOrRound();
		} else {
			systemMessageEvent(session,
					"You can not act right now - your session id is " + session);
		}
	}

	/**
	 * Called from UI - player buys highest bet
	 * 
	 * @param session
	 */
	public void playerCheck(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()
				&& checkEnabled) {

			getPlayerBySession(session).setHasActed(true);

			selectNextPlayerOrRound();

		}
	}

	/**
	 * Called from UI - player raises previous bet
	 * 
	 * @param session
	 */
	public void playerRaise(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()) {

			if (checkEnabled)
				checkEnabled = false;

			getPlayerBySession(session).increaseBet(betAmount);
			getPlayerBySession(session).setHasActed(true);

			selectNextPlayerOrRound();

		}
	}

	/**
	 * Called from UI - player chats
	 * 
	 * @param message
	 * @param session
	 */
	public void playerChat(String message, String session) {
		chatEvent(getPlayerBySession(session), message);
	}

	/* ==============GAME LOGIC============ */

	/**
	 * @param session
	 * @return player with desired browser session
	 */
	public Player getPlayerBySession(String session) {
		for (Player player : players) {
			if (player.getSession().equals(session))
				return player;
		}
		return null; // / Erindi peaks siia äkki tegema?
	}

	/**
	 * Starts new hand
	 * 
	 * sets players with too little chips inactive delivers small and big blinds
	 * deals cards to players
	 */
	public void startNewHand() {
		if (round == Round.SETUP || round == Round.BETWEEN_HANDS) {
			systemMessageEvent("Starting new hand");

			initializePlayers();

			for (Player player : players) {
				if (player.getChips() < smallBlind) {
					player.setActive(false);
				} else {
					player.setActive(true);
					player.setFold(false);
				}
			}

			pot = 0;
			createNewDeck();
			int dealerPos = fixateDealer();

			// update UI - new dealer
			setNewDealerEvent(players.get(dealerPos));

			selectNextPlayer(dealerPos);

			setNewRound(Round.PREFLOP);

			increasePlayerBet(currentPlayerId, smallBlind);
			players.get(currentPlayerId).setHasActed(true);

			selectNextPlayer(currentPlayerId);

			increasePlayerBet(currentPlayerId, bigBlind);
			players.get(currentPlayerId).setHasActed(true);

			for (Player player : players) {
				if (player.isActive()) {
					dealPlayerCards(player);

					// update UI player pocket cards
					dealPlayerCardsEvent(player);
				}
			}

			selectNextPlayerOrRound();

		} else {
			// TODO throw exception
		}
	}

	private void increasePlayerBet(int id, int amount) {
		players.get(id).increaseBet(amount);
		playerBetChangedEvent(players.get(id));
	}

	private void increasePlayerBet(String session, int amount) {
		getPlayerBySession(session).increaseBet(amount);
		playerBetChangedEvent(getPlayerBySession(session));
	}

	/**
	 * Sets players unique IDs
	 */
	public void initializePlayers() {
		for (int i = 0; i < players.size(); i++) {
			players.get(i).setId(i);
		}
	}

	/**
	 * Creates new deck
	 */
	public void createNewDeck() {
		this.deck = new Deck();
	}

	/**
	 * Sets new round constant lets UI know about round change
	 * 
	 * @param newRound
	 */
	private void setNewRound(Round newRound) {
		round = newRound;
		roundChangedEvent(round.getName());
	}

	/**
	 * @return index of dealer in Player list
	 */
	public int fixateDealer() {

		for (int i = 0; i < players.size(); i++) {
			if (players.get(i).isDealer()) {
				players.get(i).setDealer(false);

				for (int j = i + 1; j < players.size(); j++) {
					if (players.get(j).isActive()) {
						players.get(j).setDealer(true);
						return j;
					}
				}

				for (int j = 0; j < i + 1; j++) {
					if (players.get(j).isActive()) {
						players.get(j).setDealer(true);
						return j;
					}
				}
			}
		}

		players.get(0).setDealer(true);

		return 0;
	}

	/**
	 * Deals pocket cards to desired player
	 * 
	 * @param player
	 */
	public void dealPlayerCards(Player player) {
		Card[] cards = new Card[2];
		cards[0] = deck.drawFromDeck();
		cards[1] = deck.drawFromDeck();
		player.setCards(cards);
	}

	/**
	 * Selects next player to act
	 * 
	 * @param startId
	 */
	public void selectNextPlayer(int startId) {

		for (Player player : players) {
			if (player.getId() > startId) {
				if (player.isActive()) {
					currentPlayerId = player.getId();
					systemMessageEvent("It is " + player.getName() + "'s turn");
				}
				return; // short circuit
			}
		}

		for (Player player : players) {
			if (player.getId() < startId) {
				if (player.isActive()) {
					currentPlayerId = player.getId();
					systemMessageEvent("It is " + player.getName() + "'s turn");
				}
				return; // short circuit
			}
		}
	}

	/**
	 * Selects next round in case everybody have acted, else selects next player
	 * to act or closes hand
	 */
	public void selectNextPlayerOrRound() {
		boolean everybodyReady = true;

		int activePlayers = getActivePlayersAmount();

		systemMessageEvent("There are " + activePlayers
				+ " active players in this round");

		if (activePlayers == 0) {
			// TODO throw exception
		}

		if (activePlayers == 1) {
			for (Player player : players) {
				if (player.isActive())
					closeHand();
			}

		} else {
			if (round == Round.PREFLOP) {
				betAmount = 10;

				for (Player player : players) {
					if (!player.isHasActed())
						everybodyReady = false;
					break;
				}

				if (everybodyReady) {
					if (areBetsEqual()) {
						collectBets();
						resetPlayerHasActed();
						setNewRound(Round.FLOP);
						dealTableCards();
						flopEvent();
					}
				}
				
				everybodyReady = true;
				selectNextPlayer(currentPlayerId);
			} else if (round == Round.FLOP) {
				betAmount = 10;

				for (Player player : players) {
					if (!player.isHasActed())
						everybodyReady = false;
					break;
				}

				if (everybodyReady) {
					if (areBetsEqual()) {
						collectBets();
						resetPlayerHasActed();
						setNewRound(Round.TURN);
					}
				}

				everybodyReady = true;
				selectNextPlayer(currentPlayerId);

			} else if (round == Round.TURN) {
				betAmount = 10;

				for (Player player : players) {
					if (!player.isHasActed())
						everybodyReady = false;
					break;
				}

				if (everybodyReady) {
					if (areBetsEqual()) {
						collectBets();
						resetPlayerHasActed();
						setNewRound(Round.RIVER);
					}
				}

				everybodyReady = true;
				selectNextPlayer(currentPlayerId);

			} else if (round == Round.RIVER) {
				betAmount = 20;

				for (Player player : players) {
					if (!player.isHasActed())
						everybodyReady = false;
				}

				if (everybodyReady) {
					if (areBetsEqual()) {
						collectBets();
						resetPlayerHasActed();
						currentPlayerId = 999;
						setNewRound(Round.CLOSING);
						closeHand();
					}
				}

				everybodyReady = true;
				selectNextPlayer(currentPlayerId);
			}
		}
	}

	/**
	 * @return amount of players participating in hand
	 */
	public int getActivePlayersAmount() {
		int activePlayers = 0;

		for (Player player : players) {
			if (player.isActive())
				activePlayers++;
		}

		return activePlayers;
	}

	/**
	 * @return comparison of all the bets players have made
	 */
	public boolean areBetsEqual() {
		int bet = 0;
		boolean equality = true;

		for (Player player : players) {
			if (player.isActive()) {
				bet = player.getBet();
				break;
			}
		}

		for (Player player : players) {
			if (player.isActive() && player.getBet() != bet) {
				equality = false;
				break;
			}
		}

		return equality;
	}

	/**
	 * Sets all players not acted
	 */
	public void resetPlayerHasActed() {
		for (Player player : players) {
			player.setHasActed(false);
		}
	}

	/**
	 * Deals community cards
	 */
	public void dealTableCards() {
		Card[] cards = new Card[5];

		for (int i = 0; i < 5; i++) {
			cards[i] = deck.drawFromDeck();
		}

		tablecards = cards;
	}

	/**
	 * Declares winner winner gets pot
	 */
	public void closeHand() {
		String winningReason = "Non";
		int activePlayers = getActivePlayersAmount();

		if (activePlayers == 1) {
			for (Player player : players) {
				if (player.isActive())
					winnerPlayerId = player.getId();
			}

			winningReason = "others folded";

		} else {
			for (Player player : players) {
				if (player.isActive()) {
					player.setBestHand(findBestHand(tablecards[0],
							tablecards[1], tablecards[2], tablecards[3],
							tablecards[4], player.getCard1(), player.getCard2()));
				}
			}

			for (Player player : players) {
				boolean win = true;
				if (player.isActive()) {
					for (Player enemy : players) {
						if (player.getId() == enemy.getId())
							continue;
						else if (player.getBestHand().compareTo(
								enemy.getBestHand()) != 1) {
							win = false;
						}
					}
				}
				if (win) {
					winnerPlayerId = player.getId();
					winningReason = "best hand";
					break;
				}
			}

		}

		potToWinner(winnerPlayerId);
		// /TODO!
		setNewRound(Round.BETWEEN_HANDS);

		systemMessageEvent("Player " + getPlayerById(winnerPlayerId).getName()
				+ " won - " + winningReason);

		// playerWonEvent(getPlayerById(winnerPlayerId), winningReason);
	}

	/**
	 * @param card1
	 * @param card2
	 * @param card3
	 * @param card4
	 * @param card5
	 * @param card6
	 * @param card7
	 * @return winning hand
	 */
	public Hand findBestHand(Card card1, Card card2, Card card3, Card card4,
			Card card5, Card card6, Card card7) {
		Card[] cards = { card1, card2, card3, card4, card5, card6, card7 };
		Card lowCard1 = new Card(0, 0);
		Card lowCard2 = new Card(1, 2);
		Card lowCard3 = new Card(2, 6);
		Card lowCard4 = new Card(3, 5);
		Card lowCard5 = new Card(0, 3);
		Hand bestHand = new Hand(lowCard1, lowCard2, lowCard3, lowCard4,
				lowCard5);
		Hand tempHand = new Hand();
		int combinations[][] = { { 0, 1, 2 }, { 0, 1, 3 }, { 0, 1, 4 },
				{ 0, 2, 3 }, { 0, 2, 4 }, { 0, 3, 4 }, { 1, 2, 3 },
				{ 1, 2, 4 }, { 1, 3, 4 }, { 2, 3, 4 } };

		for (int[] combination : combinations) {
			tempHand = new Hand(cards[combination[0]], cards[combination[1]],
					cards[combination[2]], cards[5], cards[6]);
			if (tempHand.compareTo(bestHand) == 1) {
				bestHand = tempHand;
			}
		}
		return bestHand;
	}

	/**
	 * Player gets pot
	 * 
	 * @param id
	 */
	public void potToWinner(int id) {
		getPlayerById(id).addChips(pot);
		pot = 0;
	}

	/**
	 * @param id
	 * @return player with desired id
	 */
	public Player getPlayerById(int id) {
		for (Player player : players) {
			if (player.getId() == id)
				return player;
		}
		return null; // / Erindi peaks siia äkki tegema?
	}

	/**
	 * @return highest bet players have made
	 */
	public int getHighestBet() {
		int highestBet = 0;
		for (Player player : players) {
			if (player.getBet() > highestBet) {
				highestBet = player.getBet();
			}
		}
		return highestBet;
	}

	/**
	 * All chips from bets are collected to pot
	 */
	public void collectBets() {
		for (Player player : players) {
			pot += player.getBet();
			player.setBet(0);
			
			// UI update
			playerBetChangedEvent(player);
		}
		
		potChangedEvent(pot);
	}

	public void addToPot(int amount) {
		this.pot = this.pot + amount;
	}

	/* ==============EVENTS============ */

	/**
	 * UI checks if there is point in fetching new info
	 * 
	 * @param session
	 * @return boolean
	 */
	public boolean hasNewInfo(String session) {
		return infoContainer.checkForNewInfo(session);
	}

	/**
	 * UI fetches updates
	 * 
	 * @param session
	 * @return GameInfo
	 */
	public GameInfo fetchNewInfo(String session) {
		return infoContainer.popInfoFor(session);
	}

	/* ==============EVENTS============ */

	public void newPlayerAddedEvent(String session) {

		for (Player player : players) {

			GameInfo info = infoFactory.getNewPlayersInfo();

			for (Player player2 : players) {
				info.addData(player2.getName());
			}

			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	private void roundChangedEvent(String round) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewRoundInfo();

			info.addData(round);
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	private void setNewDealerEvent(Player dealer) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewDealerInfo();

			info.setId(dealer.getId());
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	private void playerBetChangedEvent(Player increasedPlayer) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewBetInfo();

			info.addData(String.valueOf(increasedPlayer.getBet()));
			info.setId(increasedPlayer.getId());
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	private void playerFoldEvent(Player foldedPlayer) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewFoldInfo();

			info.setId(foldedPlayer.getId());
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	/**
	 * System broadcast
	 * 
	 * @param message
	 */
	private void systemMessageEvent(String message) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewSystemMessageInfo();

			info.addData(message);
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	/**
	 * System private message
	 * 
	 * @param session
	 * @param message
	 */
	private void systemMessageEvent(String session, String message) {
		GameInfo info = infoFactory.getNewSystemMessageInfo();

		info.addData(message);
		info.setSession(session);

		infoContainer.add(info);

	}

	private void chatEvent(Player chattingPlayer, String message) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewChatInfo();

			info.addData(message);
			info.setName(chattingPlayer.getName());
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	private void flopEvent() {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewFlopInfo();

			for (int i = 0; i < 3; i++) {
				String rank = String.valueOf(tablecards[i].getRank());
				String suit = String.valueOf(tablecards[i].getSuit());
				String card = rank + "-" + suit;
				info.addData(card);
			}

			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

	private void dealPlayerCardsEvent(Player player) {
		GameInfo info = infoFactory.getPlayerCardsInfo();

		String firstRank = String.valueOf(player.getCard1().getRank());
		String firstSuit = String.valueOf(player.getCard1().getSuit());

		String firstCard = firstRank + "-" + firstSuit;

		String secondRank = String.valueOf(player.getCard2().getRank());
		String secondSuit = String.valueOf(player.getCard2().getSuit());

		String secondCard = secondRank + "-" + secondSuit;

		info.addData(firstCard);
		info.addData(secondCard);
		info.setId(player.getId());

		info.setSession(player.getSession());

		infoContainer.add(info);
	}

	private void playerWonEvent(Player winner, String winningReason) {
		// TODO implement
	}
	
	private void potChangedEvent(int amount) {
		for (Player player : players) {
			GameInfo info = infoFactory.getNewPotInfo();

			info.addData(String.valueOf(amount));
			info.setSession(player.getSession());

			infoContainer.add(info);
		}
	}

}