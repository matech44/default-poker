package ee.ut.defaultpoker.model;
import ee.ut.defaultpoker.evaluation.Card;
public abstract class Player {
	private int id;
	private String name;
	private int chips;
	private int bet=0;
	private boolean fold;
	private Card[] cards = new Card[2];
	
	
	
	public boolean getFold() {
		return fold;
	}

	public void setFold(boolean fold) {
		this.fold = fold;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setCards(Card[] cards) {
		this.cards = cards;
	}
	
	public Card[] getCards() {
		return this.cards;
	}
	
	public void addChips(int amount) {
		this.chips+=amount;
	}
	
	public void reduceChips(int amount) {
		this.chips-=amount;
	}
	
	public int getChips() {
		return this.chips;
	}
	
	public int getBet() {
		return this.bet;
	}
	
	public void setBet(int amount) {
		this.bet = amount;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String setName) {
		this.name=setName;
	}
	
	
	
}

