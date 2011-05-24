package ee.ut.defaultpoker.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import ee.ut.defaultpoker.model.info.GameInfo;

public class GameplayTest {

	private Engine engine;

	private String session1;
	private String session2;
	private String session3;
	private String session4;

	private String name1;
	private String name2;
	private String name3;
	private String name4;

	/**
	 * Set up engine that remains the same throughout tests
	 */
	@Before
	public void setUp() {
		engine = new Engine();

		session1 = "AAAA1111";
		session2 = "BBBB2222";
		session3 = "CCCC3333";
		session4 = "DDDD4444";

		name1 = "Andres";
		name2 = "Ardi";
		name3 = "Sander";
		name4 = "Pirokunn";

		engine.createPlayer(name1, session1);
		engine.createPlayer(name2, session2);
		engine.createPlayer(name3, session3);
		engine.createPlayer(name4, session4);
	}

	// TESTS

	/* ===========PLAYER JOINS=========== */

	@Test
	public void testPlayerCreation() {
		assertEquals(engine.getPlayersSize(), 4);

	}

	@Test
	public void testSessionMapping() {
		assertEquals(engine.getPlayerBySession(session1).getName(), name1);
		assertEquals(engine.getPlayerBySession(session2).getName(), name2);
		assertEquals(engine.getPlayerBySession(session3).getName(), name3);
		assertEquals(engine.getPlayerBySession(session4).getName(), name4);
	}

	@Test
	public void testPlayerJoinedInfoSent() {

		// info should be there
		assertTrue(engine.hasNewInfo(session1));
		assertTrue(engine.hasNewInfo(session2));
		assertTrue(engine.hasNewInfo(session3));
		assertTrue(engine.hasNewInfo(session4));

		GameInfo info;

		// pop and check info for first player who joined
		info = engine.fetchNewInfo(session1); // Andres
		assertEquals(info.getType(), "players");

		info = engine.fetchNewInfo(session1);
		assertEquals(info.getType(), "message");

		info = engine.fetchNewInfo(session1); // Andres, Ardi
		assertEquals(info.getType(), "players");

		info = engine.fetchNewInfo(session1);
		assertEquals(info.getType(), "message");

		info = engine.fetchNewInfo(session1); // Andres, Ardi, Sander
		assertEquals(info.getType(), "players");

		info = engine.fetchNewInfo(session1);
		assertEquals(info.getType(), "message");

		info = engine.fetchNewInfo(session1); // Andres, Ardi, Sander, Pirokunn
		assertEquals(info.getType(), "players");

		info = engine.fetchNewInfo(session1);
		assertEquals(info.getType(), "message");

		// info should not be there
		assertFalse(engine.hasNewInfo(session1));
	}

	/* ===========NEW HAND STARTED=========== */

	@Test
	public void testPlayerIDsSetAfterStartHand() {
		engine.startNewHand();

		// IDs start from 0, maybe fix
		assertEquals(engine.getPlayerBySession(session1).getId(), 0);
		assertEquals(engine.getPlayerBySession(session2).getId(), 1);
		assertEquals(engine.getPlayerBySession(session3).getId(), 2);
		assertEquals(engine.getPlayerBySession(session4).getId(), 3);
	}

	@Test
	public void testAllPlayersSholdBeActiveAfterStartHand() {
		engine.startNewHand();

		assertEquals(engine.getActivePlayersAmount(), 4);
	}

	@Test
	public void testDealerShouldBeFirstPlayerAfterStartHand() {
		engine.startNewHand();

		assertTrue(engine.getPlayerBySession(session1).isDealer());
	}

	@Test
	public void testBlindsShouldBeSetAfterStartHand() {
		engine.startNewHand();

		assertEquals(engine.getPlayerBySession(session2).getBet(),
				engine.getSmallBlind());
		assertEquals(engine.getPlayerBySession(session3).getBet(),
				engine.getBigBlind());
	}
	
	@Test
	public void testPlayerAfterBlindsShouldActAfterStartHand() {
		engine.startNewHand();

		assertEquals(engine.getCurrentPlayerId(), 3);
	}
}
