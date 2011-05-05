package ee.ut.defaultpoker.model;
import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Hand;
public class Player {
	private int id;
	private String name;
	private int chips = 500;
	private int bet;
	private boolean fold = false;
	private boolean dealer = false;
	private String session;
	private boolean active = true;
	private boolean hasActed = false;
	private Card[] cards = new Card[2];
	private Hand bestHand;
	
	public Player() {
		
	}
	
	public boolean getHasActed() {
		return this.hasActed;
	}
	
	public Player(String name) {
		this.name=name;
	}

	public Card getCard1() {
		return cards[0];
	}
	
	public Card getCard2() {
		return cards[1];
	}
	
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
	
	public void increaseBet(int amount) {
		setBet(amount);
		reduceChips(amount);
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

	public void setDealer(boolean dealer) {
		this.dealer = dealer;
	}

	public boolean isDealer() {
		return dealer;
	}

	public void setSession(String session) {
		this.session = session;
	}

	public String getSession() {
		return session;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isActive() {
		return active;
	}

	public void setHasActed(boolean hasActed) {
		this.hasActed = hasActed;
	}

	public boolean isHasActed() {
		return hasActed;
	}

	public void setBestHand(Hand bestHand) {
		this.bestHand = bestHand;
	}

	public Hand getBestHand() {
		return bestHand;
	}
	
	
	
}

