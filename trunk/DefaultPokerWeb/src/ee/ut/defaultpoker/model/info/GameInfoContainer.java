/**
 * 
 */
package ee.ut.defaultpoker.model.info;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Andres
 *
 */
public class GameInfoContainer {
	private List<GameInfo> infoList;

	public GameInfoContainer() {
		infoList = new ArrayList<GameInfo>();
	}
	
	public void add(GameInfo info) {
		infoList.add(info);
	}
	
	/**
	 * @param session - String session requested
	 * @return boolean exists new info
	 */
	public boolean checkForNewInfo(String session) {
		
		// search container for proper session
		for(int i = 0; i < infoList.size(); i++) {
			if(infoList.get(i).getSession().equals(session)) {
				return true; // short circuit
			}
		}
		
		return false;
	}
	
	/**
	 * @param session - String session requested
	 * @return GameInfo object with proper session
	 */
	public GameInfo popInfoFor(String session) {
		
		// search container for proper session
		for(int i = 0; i < infoList.size(); i++) {
			if(infoList.get(i).getSession().equals(session)) {
				GameInfo info = infoList.get(i); // get GameInfo
				infoList.remove(i); // remove from container
				return info; // short circuit
			}
		}
		return null;
	}

}
