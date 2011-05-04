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
	HashMap<Integer, Player> players = new HashMap<Integer, Player>();
	
	public enum Round  {
		  PREFLOP, FLOP, TURN, RIVER	
	      }

	Round round;


	public HashMap<Integer, Player> getPlayers() {
		return players;
	}

	public void setPlayers(HashMap<Integer, Player> players) {
		this.players = players;
	}

	public int getCurrentPlayerId() {
		return currentPlayerId;
	}

	public void setCurrentPlayerId(int currentPlayerId) {
		this.currentPlayerId = currentPlayerId;
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

	public int getPot() {
		return pot;
	}

	public void setPot(int pot) {
		this.pot = pot;
	}

	public void playerFold(int id) {
		players.get(id).setFold(true);
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

	public void playerCall(int id) {
		players.get(id).setBet(getHighestBet());
	}

	public void playerCheck(int id) {

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
	
	
	
	private void selectNextPlayerOrRound() {
	
	}
}
