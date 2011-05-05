package ee.ut.defaultpoker.model;

import java.util.ArrayList;
import java.util.List;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;
import ee.ut.defaultpoker.evaluation.Hand;
import ee.ut.defaultpoker.model.info.GameInfo;
import ee.ut.defaultpoker.model.info.GameInfoContainer;
import ee.ut.defaultpoker.model.info.GameInfoFactory;

public class Engine {
	public int currentPlayerId = 0;
	public int winnerPlayerId;
	private boolean checkEnabled = false;
	
	private int betAmount;
	private int smallBlind = 5;
	private int bigBlind = 10;
	private int pot;
	
	Card[] tablecards = new Card[5];
	Deck deck = new Deck();
	List<Player> players = new ArrayList<Player>();
	
	
	private GameInfoFactory infoFactory;
	private GameInfoContainer infoContainer;
	
	public int getPlayersSize() {
		return players.size();
	}
	
	public int getCurrentPlayerId() {
		return currentPlayerId;
	}

	public void setCurrentPlayerId(int currentPlayerId) {
		this.currentPlayerId = currentPlayerId;
	}

	public Player getFirstPlayer() {
		return players.get(0);
	}

	public void setPlayers(Player player) {
		this.players.add(player);
	}
	public enum Round  {
		  SETUP, PREFLOP, FLOP, TURN, RIVER, CLOSING, BETWEEN_HANDS;
	      }

	Round round;
	
	public int getPot() {
		return pot;
	}

	public Deck getDeck() {
		return deck;
	}

	public void setDeck(Deck deck) {
		this.deck = deck;
	}

	public Engine() {
		infoFactory = new GameInfoFactory();
		infoContainer = new GameInfoContainer();
		
		round = Round.SETUP;
	}
	
	
	public void collectBets() {
		for (Player player : players) {
			pot += player.getBet();
			player.setBet(0);
		}
	}
	
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
				if (player.isActive() == true && player.getBet()!= bet) {
					equality = false;
					break;
				}
		}
		return equality;
	}
	
	public Player getPlayerBySession(String __session) {
		for (Player player : players){
			if (player.getSession() == __session) return player;
		}
		return null; /// Erindi peaks siia �kki tegema?
	}
	
	public Player getPlayerById(int __id) {
		for (Player player : players){
			if (player.getId() == __id) return player;
		}
		return null; /// Erindi peaks siia �kki tegema?
	}

	public void playerFold(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()){
			getPlayerBySession(session).setFold(true);
			getPlayerBySession(session).setHasActed(true);
			getPlayerBySession(session).setActive(false);
			selectNextPlayerOrRound();
		}
	}

	public int getHighestBet() {
		int highestBet = 0;
		for (Player player : players){
			if (player.getBet() > highestBet) {
				highestBet = player.getBet();
			}
		}
		return highestBet;
	}

	public void playerCall(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()){
			int vanaBet = getPlayerBySession(session).getBet();
			int uusBet = getHighestBet() - vanaBet;
			getPlayerBySession(session).increaseBet(uusBet);
			getPlayerBySession(session).setHasActed(true);
			selectNextPlayerOrRound();
		}
	}
	
	public void setPot(int __pot) {
		this.pot = __pot;
	}
	
	public void newDeck() {
		this.deck = new Deck();
	}

	public void playerCheck(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId() && checkEnabled){
			getPlayerBySession(session).setHasActed(true);
			selectNextPlayerOrRound();
		}
	}
	
	public void playerRaise(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()){
			if (checkEnabled) checkEnabled = false;
			getPlayerBySession(session).increaseBet(betAmount);
			getPlayerBySession(session).setHasActed(true);
			selectNextPlayerOrRound();
		}
	}

	public void dealPlayerCards(Player __player) {
		Card[] cards = new Card[2];
		cards[0] = deck.drawFromDeck();
		cards[1] = deck.drawFromDeck();
		__player.setCards(cards);
	}
	
	public void createPlayer(String name, String session) {
		 Player player = new Player(name);
		 player.setSession(session);
		 players.add(player);
		 
		 newPlayerAddedEvent(session);
	}

	public void dealTableCards() {
		Card[] cards = new Card[5];
		cards[0] = deck.drawFromDeck();
		cards[1] = deck.drawFromDeck();
		cards[2] = deck.drawFromDeck();
		cards[3] = deck.drawFromDeck();
		cards[4] = deck.drawFromDeck();
		tablecards = cards;
	}
	
	public void resetPlayerHasActed() {
		for (Player player : players) {
			player.setHasActed(false);
		}
	}
	
	public void selectNextPlayerOrRound() {
		boolean everybodyReady = true;
		int activePlayers = 0;
		for (Player player : players) {
			if (player.isActive()) activePlayers++;
		}
	      if(activePlayers == 0) {
	          /// siis on nagu midagi v�ga valesti :D
	      } 
	      if (activePlayers == 1) {
	    	  for (Player player : players) {  
	    		  if (player.isActive()) closeHand();
	    	  } 
	      } else {
	          if(round == Round.PREFLOP) {
	        	  betAmount = 10;
	        	  nextPlayer(currentPlayerId);
	        	  dealTableCards();
	        	  round = Round.FLOP;
	        	  
	        	  roundChangedEvent("flop");
	          }
	          else if(round == Round.FLOP) {
	        	  betAmount = 10;
	        	  for (Player player : players) {
	        		  if (!player.isHasActed())  everybodyReady = false; break;
	        	  }
	        	  if (everybodyReady) {
	        		  if (areBetsEqual()) {
	        			  collectBets();
	        			  resetPlayerHasActed();
	        			  round = Round.TURN;
	        			  roundChangedEvent("turn");
	        		  }
	        	  }
	        	  everybodyReady = true;
	        	  nextPlayer(currentPlayerId);
	          }
	          else if(round == Round.TURN) {
	        	  betAmount = 10;
	        	  for (Player player : players) {
	        		  if (!player.isHasActed())  everybodyReady = false; break;
	        	  }
	        	  if (everybodyReady) {
	        		  if (areBetsEqual()) {
	        			  collectBets();
	        			  resetPlayerHasActed();
	        			  round = Round.RIVER;
	        			  roundChangedEvent("river");
	        		  }
	        	  }
	        	  everybodyReady = true;
	        	  nextPlayer(currentPlayerId);
	          }
	          else if(round == Round.RIVER) {
	        	  betAmount = 20;
	        	  for (Player player : players) {
	        		  if (!player.isHasActed())  everybodyReady = false;
	        	  }
	        	  if (everybodyReady) {
	        		  if (areBetsEqual()) {
	        			  collectBets();
	        			  resetPlayerHasActed();
	        			  currentPlayerId = 999;
	        			  round = Round.CLOSING;
	        			  closeHand();
	        		  }
	        	  }
	        	  everybodyReady = true;
	        	  nextPlayer(currentPlayerId);
	          }
	      }
	}
	

	public void potToWinner(int __Id) {
		getPlayerById(__Id).addChips(pot);
		this.setPot(0);
	}
	
	public Hand findBestHand(Card card1, Card card2, Card card3, 
	                          Card card4, Card card5, Card card6, 
	                          Card card7) {
		Card[] cards = { card1, card2, card3, card4, card5, card6, card7 };
		Card lowCard1 = new Card(0,0);
		Card lowCard2 = new Card(1,2);
		Card lowCard3 = new Card(2,6);
		Card lowCard4 = new Card(3,5);
		Card lowCard5 = new Card(0,3);
		Hand bestHand = new Hand(lowCard1, lowCard2, lowCard3, lowCard4, lowCard5);
		Hand tempHand = new Hand();
		int combinations[][] = {	
							{0, 1, 2},
							{0, 1, 3},
							{0, 1, 4}, 
							{0, 2, 3},
							{0, 2, 4},
							{0, 3, 4},
							{1, 2, 3},
							{1, 2, 4},
							{1, 3, 4},
							{2, 3, 4}
							};
		
		for (int[] combination : combinations) {
			tempHand = new Hand(cards[combination[0]],
					cards[combination[1]], cards[combination[2]],
					cards[5], cards[6]);
			if (tempHand.compareTo(bestHand) == 1) {
				bestHand = tempHand;
			}
		}
		return bestHand;
	}
	
	public void closeHand() {
		int activePlayers = 0;
		for (Player player : players) {
			if (player.isActive()) activePlayers++;
		}
		if (activePlayers == 1) {
			for (Player player : players) {
				if (player.isActive()) winnerPlayerId = player.getId();
			}
		} else {
			for (Player player : players) {
				if (player.isActive()) {
					player.setBestHand(findBestHand(tablecards[0], tablecards[1], 
					                              tablecards[2], tablecards[3], 
					                              tablecards[4], player.getCard1(),
					                              player.getCard2())
					                              );
				}
			}
			
			for (Player player : players) {
				boolean win = true;
				if (player.isActive()){
					for (Player enemy : players) {
						if (player.getId() == enemy.getId()) continue;
						else if (player.getBestHand().compareTo(enemy.getBestHand()) != 1) {
							win = false;
						}
					}
				}
				if (win) {
					winnerPlayerId = player.getId();
					break;
				}
			}
			
			potToWinner(winnerPlayerId);
			///TODO!
			round = Round.BETWEEN_HANDS;
		}
	}
	
	public int fixateDealer() {
		for (int i=0 ; i<players.size() ; i++) {
			if (players.get(i).isDealer()) {
				players.get(i).setDealer(false);
				for (int j=i+1; j<players.size() ; j++) {
					if (players.get(j).isActive()){
						players.get(j).setDealer(true);
						return j;
					}
				}
				for (int j=0; j<i+1 ; j++) {
					if (players.get(j).isActive()){
						players.get(j).setDealer(true);
						return j;
					}
				}
			}
		}
		players.get(0).setDealer(true);
		return 0;
	}
	
	public void initializePlayers() {
		for (int i=0 ; i < players.size() ; i++) {
			players.get(i).setId(i);
		}
	}
	
	public void nextPlayer(int startId) {
		for (Player player : players) {
			if (player.getId() > startId) {
				if (player.isActive()) this.currentPlayerId = player.getId(); return;
			}
		}
		for (Player player : players) {
			if (player.getId() < startId) {
				if (player.isActive()) this.currentPlayerId = player.getId(); return;
			}
		}
	}
	
	public void startNewHand() {
		if (round == Round.SETUP || round == Round.BETWEEN_HANDS) {
			initializePlayers();
			for (Player player : players) {
				if (player.getChips() < smallBlind ) {
					player.setActive(false);
				} else {
					player.setActive(true);
					player.setFold(false);
				}
			}
			
			setPot(0);
			newDeck();
			int dealerPos = fixateDealer();
			nextPlayer(dealerPos);
			this.round = Round.PREFLOP;
			roundChangedEvent("preflop");
			players.get(currentPlayerId).increaseBet(smallBlind);
			players.get(currentPlayerId).setHasActed(true);
			nextPlayer(currentPlayerId);
			players.get(currentPlayerId).increaseBet(bigBlind);
			players.get(currentPlayerId).setHasActed(true);
			for (Player player : players) {
				if (player.isActive()){
					dealPlayerCards(player);
					dealPlayerCardsEvent(player);
				}
			}
			selectNextPlayerOrRound();
			
		} else {
			
		}
	}

	public void addToPot(int amount) {
		this.pot=this.pot+amount;
	}

	public String whatRound(Round round) {
		if (round == Round.SETUP) {
			return "Setup";
		}
		else if (round == Round.PREFLOP) {
			return "Preflop";
		}
		else if (round == Round.FLOP) {
			return "Flop";
		}
		else if (round == Round.TURN) {
			return "Turn";
		}
		else if (round == Round.RIVER) {
			return "River";
		}
		else if (round == Round.BETWEEN_HANDS) {
			return "Between hands";
		}
		else if (round == Round.CLOSING) {
			return "Closing";
		}
		return null;
	}
	
	public void newPlayerAddedEvent(String session) {
		GameInfo info = infoFactory.getNewPlayersInfo();
		
		for(Player player : players) {
			info.addData(player.getName());
		}
		
		info.setSession(session);
		infoContainer.add(info);
	}
	
	private void roundChangedEvent(String round) {
		for(Player player : players) {
			GameInfo info = infoFactory.getNewRoundInfo();
			
			info.addData(round);
			info.setSession(player.getSession());
			
			infoContainer.add(info);
		}
	}
	
	private void dealPlayerCardsEvent(Player player) {
		GameInfo info = infoFactory.getPlayerCardsInfo();
		
		String firstRank = String.valueOf(player.getCard1().getRank());
		String firstSuit = String.valueOf(player.getCard1().getSuit());
		
		String firstCard = firstRank + "," + firstSuit;
		
		String secondRank = String.valueOf(player.getCard2().getRank());
		String secondSuit = String.valueOf(player.getCard2().getSuit());
		
		String secondCard = secondRank + "," + secondSuit;
		
		info.addData(firstCard);
		info.addData(secondCard);
		
		info.setSession(player.getSession());
		
		infoContainer.add(info);
	}
	
	public boolean hasNewInfo(String session) {
		return infoContainer.checkForNewInfo(session);
	}
	
	public GameInfo fetchNewInfo(String session) {
		return infoContainer.popInfoFor(session);
	}

}