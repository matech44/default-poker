package ee.ut.defaultpoker.model.engine;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import ee.ut.defaultpoker.evaluation.Card;
import ee.ut.defaultpoker.evaluation.Deck;
import ee.ut.defaultpoker.model.Engine;
import ee.ut.defaultpoker.model.Engine.Round;
import ee.ut.defaultpoker.model.Player;

public class engineTest {
	private Engine engine;
	private Engine engine2;
	private Player player;
	private Player player2;
	private Player player3;
	
	@Before
	public void setUp() {
		engine = new Engine();
		engine2 = new Engine();
		player = new Player();
		player2 = new Player();
		player3 = new Player();
		
		engine.setPlayers(player);
		engine.setPlayers(player2);
		engine.setPlayers(player3);
		
	}
	
//	@Test
//	public void createNewDeck() {
//		Deck deck2 = new Deck();
//		
//		engine.newDeck();
//		Deck expected = deck2;
//		Deck actual = engine.getDeck();
//		
//		assertTrue(expected.equals(actual));
//	}
	
	@Test
	public void areBetsEqual() {
		player.setBet(50);
		player2.setBet(50);
		player3.setBet(50);
		
		boolean expected = false;
		if (player.getBet()==player2.getBet() && player2.getBet()== player3.getBet()) {
			expected=true;
		}
		
		boolean actual = engine.areBetsEqual();
		
		assertTrue(expected==actual);
	}
	
	@Test
	public void collectBets() {
		player.setBet(50);
		player2.setBet(50);
		player3.setBet(50);
		
		int expectedPot = player.getBet()+player2.getBet()+player3.getBet();
		
		engine.collectBets();
		
		assertTrue(engine.getPot()==expectedPot);
	}
	
	@Test
	public void getPlayers() {
		List<Player> playersExpected = new ArrayList<Player>();
		
		playersExpected.add(player);
		playersExpected.add(player2);
		playersExpected.add(player2);
	
		assertTrue(engine.getPlayersSize()==playersExpected.size());
	}
	
	@Test
	public void getHighestBet() {
		player.setBet(50);
		player2.setBet(90); //Highest bet
		player3.setBet(50);
		
		int expected = player2.getBet();
	
		int actual = engine.getHighestBet();
		
		assertTrue(actual==expected);
	}
	
	@Test
	public void dealPlayerCards() {
		engine.dealPlayerCards(player);
		
		assertNotNull(player.getCard1());
		assertNotNull(player.getCard2());
		assertNotSame(player.getCard1(), player.getCard2());
	}
	
	@Test
	public void createPlayer() {
		
		assertEquals(0, engine2.getPlayersSize());
		
		engine2.createPlayer("Ardi", "ProoviHash");
		
		assertTrue(engine2.getPlayersSize()==1);
		
		assertTrue(engine2.getFirstPlayer().getName()=="Ardi");
		assertTrue(engine2.getFirstPlayer().getSession()=="ProoviHash");
	}
	
	@Test
	public void addToPot() {
		int testPot = 50;
		engine.addToPot(testPot);
		
		assertTrue(engine.getPot()==testPot);
	}
	
	@Test 
	public void testNewPlayerChips() {
		assertEquals(0, engine2.getPlayersSize());
		
		engine2.createPlayer("Ardi", "ProoviHash");
		
		int playerChips = engine2.getFirstPlayer().getChips();
		assertTrue(playerChips==500);
	}
	
	@Test
	public void playerFold() {
		assertEquals(0, engine2.getPlayersSize());
		
		engine2.createPlayer("Ardi", "ProoviHash");
		
		engine2.setCurrentPlayerId(engine2.getFirstPlayer().getId());
		assertTrue(engine2.getCurrentPlayerId()==engine2.getFirstPlayer().getId());
		
		engine2.getFirstPlayer().setFold(false);
		engine2.getFirstPlayer().setActive(true);
		
		engine2.playerFold("ProoviHash");
		
		boolean foldTest2 = engine2.getFirstPlayer().getFold();
		boolean activeTest2 = engine2.getFirstPlayer().isActive();
		
		assertTrue(foldTest2==true);
		assertTrue(activeTest2==false);
	}
	
	@Test
	public void resetPlayerHasActed() {
		player.setHasActed(true);
		player2.setHasActed(true);
		player3.setHasActed(true);
		
		assertTrue(player.getHasActed());
		assertTrue(player2.getHasActed());
		assertTrue(player3.getHasActed());
		
		engine.resetPlayerHasActed();
		
		assertFalse(player.getHasActed());
		assertFalse(player2.getHasActed());
		assertFalse(player3.getHasActed());
	}
	
	@Test
	public void whatRound() {
		
		String setup = "Setup";
		String preflop = "Preflop";
		String flop = "Flop";
		String turn = "Turn";
		String river = "River";
		String betweenhands = "Between hands";
		String closing = "Closing";
		
		Round setupRound = Round.SETUP;
		Round preFlopRound = Round.PREFLOP;
		Round flopRound = Round.FLOP;
		Round turnRound = Round.TURN;
		Round riverRound = Round.RIVER;
		Round betweenhandsRound = Round.BETWEEN_HANDS;
		Round closingRound = Round.CLOSING;
		
		assertTrue(engine.whatRound(setupRound)==setup);
		assertTrue(engine.whatRound(preFlopRound)==preflop);
		assertTrue(engine.whatRound(flopRound)==flop);
		assertTrue(engine.whatRound(turnRound)==turn);
		assertTrue(engine.whatRound(riverRound)==river);
		assertTrue(engine.whatRound(betweenhandsRound)==betweenhands);
		assertTrue(engine.whatRound(closingRound)==closing);
	}
	
	@Test
	public void initializePlayers() {
		assertTrue(player.getId()==0);
		assertTrue(player2.getId()==0);
		assertTrue(player3.getId()==0);
		
		engine.initializePlayers();
		
		assertNotNull(player.getId()==0);
		assertNotNull(player2.getId()==0);
		assertNotNull(player3.getId()==0);
	}
	
	@Test
	public void dealTableCards() {
		
		Card[] tablecardsBefore = engine.getTablecards(); 
		
		assertTrue(tablecardsBefore.length==5);
		assertNull(tablecardsBefore[0]);
		assertNull(tablecardsBefore[1]);
		assertNull(tablecardsBefore[2]);
		assertNull(tablecardsBefore[3]);
		assertNull(tablecardsBefore[4]);
		
		engine.dealTableCards();
		
		Card[] tablecardsAfter = engine.getTablecards(); 
		
		assertTrue(tablecardsAfter.length==5);
		assertNotNull(engine.getTablecards());
		
		assertNotNull(tablecardsAfter[0]);
		assertNotNull(tablecardsAfter[1]);
		assertNotNull(tablecardsAfter[2]);
		assertNotNull(tablecardsAfter[3]);
		assertNotNull(tablecardsAfter[4]);
	}
	
	@Test
	public void getPlayerBySession() {
		player.setSession("player");
		player2.setSession("player2");
		player3.setSession("player3");
	
		Player playerTest = engine.getPlayerBySession("player");
		Player player2Test = engine.getPlayerBySession("player2");
		Player player3Test = engine.getPlayerBySession("player3");
		
		assertSame(player, playerTest);
		assertSame(player2, player2Test);
		assertSame(player3, player3Test);
	}
	
	 @Test
	 public void getPlayerById() {
			player.setId(0);
			player2.setId(1);
			player3.setId(2);
		
			Player playerTest = engine.getPlayerById(0);
			Player player2Test = engine.getPlayerById(1);
			Player player3Test = engine.getPlayerById(2);
			
			assertSame(player, playerTest);
			assertSame(player2, player2Test);
			assertSame(player3, player3Test);
	 }
	 
	 @Test
	 public void setPot() {
		 int testPot = 50;
		 engine.setPot(50);
		 
		 assertTrue(testPot==engine.getPot());
	 }
	 
	 @Test
	 public void playerCall() {
			assertEquals(0, engine2.getPlayersSize());
			
			engine2.createPlayer("Ardi", "ProoviHash");
			engine2.createPlayer("Arno", "ProoviHash2");
			
			Player playerTest = engine2.getPlayerBySession("ProoviHash");
			Player playerTest2 = engine2.getPlayerBySession("ProoviHash2");
			
			playerTest.setBet(100);
			playerTest2.setBet(150);
			
			assertTrue(playerTest.getBet()==100);
			assertTrue(playerTest2.getBet()==150);
			
			engine2.setCurrentPlayerId(playerTest.getId());
			assertTrue(engine2.getCurrentPlayerId()==playerTest.getId());
			assertFalse(playerTest.getHasActed());
			
			engine2.playerCall("ProoviHash");
			
			assertTrue(playerTest.getBet()==150);
			assertTrue(playerTest.getHasActed());
	 }
	 
	 @Test
	 public void newDeck() {
		 Deck deck = engine.getDeck();
		 engine.newDeck();
		 assertNotSame(deck ,engine.getDeck());
	 }
	 
	 @Test
	 public void playerCheck() {
			assertEquals(0, engine2.getPlayersSize());
			engine2.createPlayer("Ardi", "ProoviHash");
			Player playerTest = engine2.getPlayerBySession("ProoviHash");
			
			engine2.setCheckEnabled(true);
			engine2.setCurrentPlayerId(playerTest.getId());
			assertTrue(engine2.getCurrentPlayerId()==playerTest.getId());
			assertFalse(playerTest.getHasActed());
			
			engine2.playerCheck("ProoviHash");
			assertTrue(playerTest.getHasActed());
	 }
	 
	 @Test
	 public void playerRaise() {
			assertEquals(0, engine2.getPlayersSize());
			
			engine2.createPlayer("Ardi", "ProoviHash");
			
			engine2.setCheckEnabled(true);
			Player playerTest = engine2.getPlayerBySession("ProoviHash");
			
			playerTest.setBet(50);
			playerTest.setHasActed(false);
			
			engine2.setCurrentPlayerId(playerTest.getId());
			assertTrue(engine2.getCurrentPlayerId()==playerTest.getId());
			engine2.setBetAmount(200);
			
			engine2.playerRaise("ProoviHash");
			assertFalse(engine2.getCheckEnabled());
			assertTrue(playerTest.getHasActed());
			assertTrue(playerTest.getBet()==250);
	 }
	 
	 @Test
	 public void potToWinner() {
		 engine.setPot(100);
		 player.setId(0);
		 
		 engine.potToWinner(0);
		 assertTrue(engine.getPot()==0);
		 assertTrue(player.getChips()==600);
	 }
	 
	 
}