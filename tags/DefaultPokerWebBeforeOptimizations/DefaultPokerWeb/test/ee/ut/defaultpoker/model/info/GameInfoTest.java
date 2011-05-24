package ee.ut.defaultpoker.model.info;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class GameInfoTest {
	private GameInfoFactory factory;
	private GameInfoContainer container;
	
	@Before
	public void setUp() {
		factory = new GameInfoFactory();
		container = new GameInfoContainer();
	}
	
	@Test
	public void testCheckForFoundNewInfo() {
		GameInfo info = factory.getNewPlayersInfo();
		
		String session = "A1B2C3D4E5F6";
		info.setSession(session);
		container.add(info);
		
		assertTrue(container.checkForNewInfo(session));
	}
	
	@Test
	public void testCheckForNewInfoNotFound() {
		GameInfo info = factory.getNewPlayersInfo();
		
		String session = "A1B2C3D4E5F6";
		String requestSession = "BBBBBBBBBBB";
		info.setSession(session);
		container.add(info);
		
		assertFalse(container.checkForNewInfo(requestSession));
	}
	
	@Test
	public void testForFetchingNewInfo() {
		GameInfo info = factory.getNewPlayersInfo();
		
		String session = "A1B2C3D4E5F6";
		info.setSession(session);
		info.addData("tere");
		container.add(info);
		
		String expected = "tere";
		String actual = container.popInfoFor(session).getData().get(0);
		
		assertEquals(expected, actual);
	}
	
	@Test
	public void testForContainerRemoval() {
		GameInfo info = factory.getNewPlayersInfo();
		
		String session = "A1B2C3D4E5F6";
		info.setSession(session);
		info.addData("tere");
		container.add(info);
		container.popInfoFor(session);
		
		assertFalse(container.checkForNewInfo(session));
	}
}
