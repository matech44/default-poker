package ee.ut.defaultpoker.model;

import java.util.ArrayList;
import java.util.List;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;
import ee.ut.defaultpoker.evaluation.Hand;

public class Engine {
	public int currentPlayerId = 0;
	public int winnerPlayerId;
	private boolean checkEnabled = false;
	private int betAmount;
	private int smallBlind = 5;
	private int bigBlind = 10;
	Card[] tablecards = new Card[5];
	Deck deck = new Deck();
	List<Player> players = new ArrayList<Player>();
	private int pot;
	
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
		round = Round.SETUP;
	}
	
	
	public void collectBets() {
		for (Player player : players) {
			if (player != null) {
				pot += player.getBet();
				player.setBet(0);
			}
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
		return null; /// Erindi peaks siia äkki tegema?
	}
	
	public Player getPlayerById(int __id) {
		for (Player player : players){
			if (player.getId() == __id) return player;
		}
		return null; /// Erindi peaks siia äkki tegema?
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
	
	public void createPlayer(String session, String name) {
		 Player player = new Player(name);
		 player.setSession(session);
		 players.add(player);
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
	          /// siis on nagu midagi väga valesti :D
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
		System.out.println("***** Mootor");
		
		Card[] cards = { card1, card2, card3, card4, card5, card6, card7 };
		Card card = new Card(0,0);
		System.out.println(card.getRank() + " / " + card.getSuit());
		Hand bestHand = new Hand(card, card, card, card, card);
		bestHand.displayAll();
		Hand tempHand = new Hand();
		int combinations[][] = {	
							{0, 1, 2, 3, 4},
							{0, 1, 2, 3, 5},
							{0, 1, 2, 3, 6}, 
							{0, 1, 2, 4, 5},
							{0, 1, 2, 4, 6},
							{0, 1, 3, 4, 5},
							{0, 1, 3, 5, 6},
							{0, 1, 4, 5, 6},
							{0, 2, 3, 4, 5},
							{0, 2, 3, 5, 6},
							{0, 2, 4, 5, 6},
							{0, 3, 4, 5, 6},
							{1, 2, 3, 4, 5},
							{1, 2, 3, 4, 6},
							{1, 2, 3, 5, 6},
							{1, 2, 4, 5, 6},
							{1, 3, 4, 5, 6},
							{2, 3, 4, 5, 6}
							};
		
		for (int[] combination : combinations) {
			tempHand = new Hand(cards[combination[0]],
					cards[combination[1]], cards[combination[2]],
					cards[combination[3]], cards[combination[4]]);
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
			/*
			for (int i=0 ; i<players.size() ; i++) {
				if (players.get(i).isActive()){
					boolean win = true;
					for (int j=0 ; j<players.size() ; j++) {
						if (i==j) continue;
						else if (players.get(j).isActive()){
							if (players.get(i).getBestHand().compareTo(players.get(j).getBestHand()) != 1) {
								win = false;
							}
						}
					}
					if (win == true) {
						winnerPlayerId = players.get(i).getId();
					}
				}
			}*/
			
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
			players.get(currentPlayerId).increaseBet(smallBlind);
			players.get(currentPlayerId).setHasActed(true);
			nextPlayer(currentPlayerId);
			players.get(currentPlayerId).increaseBet(bigBlind);
			players.get(currentPlayerId).setHasActed(true);
			for (Player player : players) {
				if (player.isActive()){
					dealPlayerCards(player);
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

}