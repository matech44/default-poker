package ee.ut.defaultpoker.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;

public class Engine {
	private int status;
	private int currentPlayerId;
	List<Card> tablecards = new ArrayList<Card>();
	Deck deck = new Deck();
	private int pot;
	HashMap<Integer, Player> players = new HashMap<Integer, Player>();
	
	public HashMap<Integer, Player> getPlayers() {
		return players;
	}
	public void setPlayers(HashMap<Integer, Player> players) {
		this.players = players;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCurrentPlayerId() {
		return currentPlayerId;
	}
	public void setCurrentPlayerId(int currentPlayerId) {
		this.currentPlayerId = currentPlayerId;
	}
	public List<Card> getTablecards() {
		return tablecards;
	}
	public void setTablecards(List<Card> tablecards) {
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
	    	int subject = ((Player)itr.next()).getBet();
	    	if (subject > highestBet) {
	    		highestBet = subject;
	    	}
	    }
		return highestBet;
	}
	
	public void playerCheck(int id) {
		
	}
	
	
	
}
