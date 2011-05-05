package ee.ut.defaultpoker.model.info;

public class GameInfoFactory {

	public GameInfoFactory() {

	}
	
	public GameInfo getNewPlayersInfo() {
		GameInfo info = new GameInfo("players");
		
		return info;
	}

}
