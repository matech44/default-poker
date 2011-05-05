package ee.ut.defaultpoker.model.info;

public class GameInfoFactory {

	public GameInfoFactory() {

	}
	
	public GameInfo getNewPlayersInfo() {
		GameInfo info = new GameInfo("players");
		
		return info;
	}

	public GameInfo getNewRoundInfo() {
		GameInfo info = new GameInfo("round");
		return info;
	}

	public GameInfo getPlayerCardsInfo() {
		GameInfo info = new GameInfo("playercards");
		return info;
	}

}
