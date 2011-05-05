package ee.ut.defaultpoker.evaluation;

public class Card
{
	private short rank, suit;

	private static String[] suits = { "hearts", "spades", "diamonds", "clubs" };
	private static String[] ranks  = { "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King" };
	//private static String[] ranks  = { "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace" };

	public static String rankAsString( int __rank ) {
		return ranks[__rank];
	}

	public Card(short suit, short rank)
	{
		this.rank=rank;
		this.suit=suit;
	}
	
	public Card(int suit, int rank)
	{
		this.rank= (short) rank;
		this.suit= (short) suit;
	}

	public @Override String toString()
	{
		  return ranks[rank] + " of " + suits[suit];
	}

	public short getRank() {
		 return rank;
	}

	public short getSuit() {
		return suit;
	}
}
