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

	public GameInfo getNewDealerInfo() {
		GameInfo info = new GameInfo("dealer");
		return info;
	}

	public GameInfo getNewBetInfo() {
		GameInfo info = new GameInfo("bet");
		return info;
	}

	public GameInfo getNewFoldInfo() {
		GameInfo info = new GameInfo("fold");
		return info;
	}

	public GameInfo getNewSystemMessageInfo() {
		GameInfo info = new GameInfo("message");
		return info;
	}

	public GameInfo getNewFlopInfo() {
		GameInfo info = new GameInfo("flop");
		return info;
	}

	public GameInfo getNewChatInfo() {
		GameInfo info = new GameInfo("chat");
		return info;
	}

	public GameInfo getNewPotInfo() {
		GameInfo info = new GameInfo("pot");
		return info;
	}

	public GameInfo getNewShowdownInfo() {
		GameInfo info = new GameInfo("showdown");
		return info;
	}

	public GameInfo getNewOthersCardsInfo() {
		GameInfo info = new GameInfo("otherscards");
		return info;
	}

	public GameInfo getNewTurnInfo() {
		GameInfo info = new GameInfo("turn");
		return info;
	}

	public GameInfo getNewRiverInfo() {
		GameInfo info = new GameInfo("river");
		return info;
	}

}
