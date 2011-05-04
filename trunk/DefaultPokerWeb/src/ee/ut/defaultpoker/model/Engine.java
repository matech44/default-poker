package ee.ut.defaultpoker.model;

import java.util.ArrayList;
import java.util.List;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;

public class Engine {
	private int currentPlayerId;
	private boolean checkEnabled = false;
	private int betAmount;
	private int smallBlind = 5;
	private int bigBlind = 10;
	Card[] tablecards = new Card[5];
	Deck deck = new Deck();
	private int pot;
	//List<Player> activePlayers = new ArrayList<Player>();
	List<Player> players = new ArrayList<Player>();
	
	public enum Round  {
		  SETUP, PREFLOP, FLOP, TURN, RIVER, BETWEEN_HANDS;
	      }

	Round round;
	
	public void collectBets() {
		for (Player player : players) {
			if (player != null) {
				pot += player.getBet();
				player.setBet(0);
				player.setHasActed(false);
			}
		}
	}
	
	public boolean areBetsEqual() {
		int bet= 0;
		boolean equality=true;
		for (Player player : players) {
			if (player.isActive()) {
				bet = player.getBet();
				break;
			}
		}
		for (Player player : players) {
				if (player.isActive() && player.getBet()!=bet) {
					equality=false;
					break;
				}
		}
		return equality;
	}
	
	public Player getPlayerBySession(String __session) {
		for (Player player : players){
			if (player.getSession() == __session) return player;
		}
		return null; ///TODO!
	}

	public void playerFold(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()){
			getPlayerBySession(session).setFold(true);
			getPlayerBySession(session).setActive(false);
			selectNextPlayerOrRound();
		}
	}

	public int getHighestBet() {
		int highestBet = 0;
		for (Player player : players){
			int subject = player.getBet();
			if (subject > highestBet) {
				highestBet = subject;
			}
		}
		return highestBet;
	}

	public void playerCall(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()){
			getPlayerBySession(session).increaseBet(getHighestBet() - getPlayerBySession(session).getBet());
			getPlayerBySession(session).setHasActed(true);
			selectNextPlayerOrRound();
		}
	}
	
	public void setPot(int __pot) {
		this.pot = __pot;
	}
	
	public void checkDeck() {
		if (this.deck.getTotalCards() < ((this.players.size() * 2) + 5)) {
			this.deck = new Deck();
		}
	}

	public void playerCheck(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId() & checkEnabled){
			selectNextPlayerOrRound();
		}
	}
	
	public void playerRaise(String session) {
		if (currentPlayerId == getPlayerBySession(session).getId()){
			if (checkEnabled) checkEnabled = false;
			getPlayerBySession(session).increaseBet(betAmount);
			selectNextPlayerOrRound();
		}
	}


	public void createNewDeck() {
		deck = new Deck();
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
	          /// WHY?
	      } 
	      if (activePlayers == 1) {
	    	  for (Player player : players) {  
	    		  if (player.isActive()); ///TODO! Siis tema v6itis
	    	  } 
	      } else {
	          if(round == Round.PREFLOP) {
	        	  betAmount = 10;
	        	  currentPlayerId++;
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
	        			  resetPlayerHasActed();
	        			  round = Round.TURN;
	        		  }
	        	  }
	        	  currentPlayerId++;
	          }
	          else if(round == Round.TURN) {
	        	  betAmount = 10;
	        	  for (Player player : players) {
	        		  if (!player.isHasActed())  everybodyReady = false; break;
	        	  }
	        	  if (everybodyReady) {
	        		  if (areBetsEqual()) {
	        			  resetPlayerHasActed();
	        			  round = Round.RIVER;
	        		  }
	        	  }
	        	  currentPlayerId++;
	          }
	          else if(round == Round.RIVER) {
	        	  betAmount = 20;
	        	  for (Player player : players) {
	        		  if (!player.isHasActed())  everybodyReady = false;
	        	  }
	        	  if (everybodyReady) {
	        		  if (areBetsEqual()) {
	        			  resetPlayerHasActed();
	        			  round = Round.BETWEEN_HANDS;
	        			  closeHand();
	        		  } else {
	        			  currentPlayerId++;
	        		  }
	        	  } else currentPlayerId++;
	          }
	      }
	}
	
	public void closeHand() {
		
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
		players.get(0).setDealer(true); ///TODO!
		return 0;
	}
	
	public void initializePlayers() {
		for (int i=0 ; i < players.size() ; i++) {
			players.get(i).setId(i);
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
			checkDeck();
			int dealerPos = fixateDealer();
			this.currentPlayerId = dealerPos + 1;
			this.round = Round.PREFLOP;
			
			players.get(currentPlayerId).setBet(smallBlind);
			currentPlayerId++;
			players.get(currentPlayerId).setBet(bigBlind);
			this.setPot(bigBlind);
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
}