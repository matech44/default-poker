package ee.ut.defaultpoker.model;

public abstract class Player {
	private int id;
	private String name;
	private int chips;
	private int bet=0;
	private boolean fold;
	String[] cards;
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setCards(String[] cards) {
		this.cards = cards;
	}
	
	public String[] getCards() {
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

