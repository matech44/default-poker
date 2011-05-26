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

/**
 * Servlet implementation class PokerServlet
 */
@WebServlet(urlPatterns = "/server", asyncSupported = true)
public class PokerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private Gson gson;

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
		gson = new Gson();
	}

	/**
	 * @see Servlet#destroy()
	 */
	public void destroy() {

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html;charset=utf-8");

		PrintWriter out = response.getWriter();
		String sessionId = request.getSession().getId();
		String parameter = request.getParameter("task");

		if (parameter.equals("getinfo")) {
			
			while(!engine.hasNewInfo(sessionId)) {
				try {
					Thread.sleep(200);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
			out.println(gson.toJson(engine.fetchNewInfo(sessionId)));

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

		if (parameter.equals("join")) {
			String name = request.getParameter("name");
			engine.joinGame(name, sessionId);
		} else if (parameter.equals("spec")) {
			engine.spectate(sessionId);
		} else if (parameter.equals("starthand")) {
			engine.startNewHand();
		} else if (parameter.equals("fold")) {
			engine.registerAction("fold", sessionId);
		} else if (parameter.equals("call")) {
			engine.registerAction("call", sessionId);
		} else if (parameter.equals("raise")) {
			engine.registerAction("bet", sessionId);
		} else if (parameter.equals("chat")) {
			String message = request.getParameter("message");
			engine.playerChat(message, sessionId);
		}
	}

}
