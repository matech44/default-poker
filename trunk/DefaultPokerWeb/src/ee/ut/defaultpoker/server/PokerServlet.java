package ee.ut.defaultpoker.server;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import ee.ut.defaultpoker.model.Engine;
import ee.ut.defaultpoker.model.info.GameInfo;

/**
 * Servlet implementation class PokerServlet
 */
@WebServlet("/server")
public class PokerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private Engine engine;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PokerServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		engine = new Engine();
	}

	/**
	 * @see Servlet#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession(true);

		PrintWriter out = response.getWriter();
		
		String parameter = request.getParameter("task");
		String sessionId = session.getId(); 
		
		Gson gson = new Gson();

		if(parameter.equals("getinfo")) {
			if(engine.hasNewInfo(sessionId)) {
				out.println(gson.toJson(engine.fetchNewInfo(sessionId)));
			} else {
				out.println(gson.toJson("null"));
			}
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession(true);
		
		String parameter = request.getParameter("task");
		String sessionId = session.getId();
		
		if(parameter.equals("join")) {
			String name = request.getParameter("name");
			engine.createPlayer(name, sessionId);
		} else if(parameter.equals("starthand")) {
			engine.startNewHand();
		} else if(parameter.equals("fold")) {
			engine.playerFold(sessionId);
		} else if(parameter.equals("call")) {
			engine.playerCall(sessionId);
		} else if(parameter.equals("chat")) {
			String message = request.getParameter("message");
			engine.playerChat(message, sessionId);
		}
	}

}
