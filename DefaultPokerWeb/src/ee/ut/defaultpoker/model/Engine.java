package ee.ut.defaultpoker.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;

public class Engine {
	private int currentPlayerId;
	Card[] tablecards = new Card[5];
	Deck deck = new Deck();
	private int pot;
	List<Player> activePlayers = new ArrayList();
	HashMap<String, Player> players = new HashMap<String, Player>();
	
	public enum Round  {
		  SETUP, PREFLOP, FLOP, TURN, RIVER, BETWEEN_HANDS;
	      }

	Round round;

	public void playerFold(String session) {
		players.get(session).setFold(true);
	}

	public int getHighestBet() {
		Iterator<Player> itr = players.values().iterator();
		int highestBet = 0;
		while (itr.hasNext()) {
			int subject = ((Player) itr.next()).getBet();
			if (subject > highestBet) {
				highestBet = subject;
			}
		}
		return highestBet;
	}

	public void playerCall(String session) {
		players.get(session).setBet(getHighestBet());
	}

	public void playerCheck(String session) {

	}

	public void createNewDeck() {
		deck = new Deck();
	}

	public void dealPlayerCards(int numberOfPlayers) {
		Iterator<Player> itr = players.values().iterator();
		Card[] cards = new Card[2];
		while (itr.hasNext()) {
			cards[0] = deck.drawFromDeck();
			cards[1] = deck.drawFromDeck();
			((Player) itr.next()).setCards(cards);
		}
	}

	public void dealTableCards(int numberOfPlayers) {
		Card[] cards = new Card[5];
		cards[0] = deck.drawFromDeck();
		cards[1] = deck.drawFromDeck();
		cards[2] = deck.drawFromDeck();
		cards[3] = deck.drawFromDeck();
		cards[4] = deck.drawFromDeck();
		tablecards = cards;
	}
	
	public void selectNextPlayerOrRound() {
	      if(activePlayers.size() != 0) {
	          //chooseNextPlayer();
	      } else {
	          if(round == Round.PREFLOP) {
	        	  round = Round.FLOP;
	          }	
	          else if(round == Round.FLOP) {
	        	  round = Round.TURN;
	          }
	          else if(round == Round.TURN) {
	        	  round = Round.RIVER;
	          }
	          else if(round == Round.RIVER) {
	        	  round = Round.BETWEEN_HANDS;
	          }
	      }
	}
}