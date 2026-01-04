#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
const TOOL_REGISTRY = [
    {
        name: "keiro_search",
        description: "Search the web using KEIRO's semantic search engine. Returns relevant results with titles, URLs, and content snippets optimized for AI consumption.",
        endpoint: "/search" /* Endpoint.Search */,
        paramKey: "query",
        inputSchema: {
            type: "object",
            properties: { query: { type: "string", description: "The search query" } },
            required: ["query"],
        },
    },
    {
        name: "keiro_search_pro",
        description: "Advanced search with enhanced results, metadata, related queries, and deeper content extraction. Best for comprehensive information gathering.",
        endpoint: "/search-pro" /* Endpoint.SearchPro */,
        paramKey: "query",
        inputSchema: {
            type: "object",
            properties: { query: { type: "string", description: "The search query" } },
            required: ["query"],
        },
    },
    {
        name: "keiro_research",
        description: "Conduct comprehensive research on any topic. Returns a detailed summary, key points, timeline, and cited sources. Perfect for in-depth analysis.",
        endpoint: "/research" /* Endpoint.Research */,
        paramKey: "query",
        inputSchema: {
            type: "object",
            properties: { query: { type: "string", description: "The research topic or question" } },
            required: ["query"],
        },
    },
    {
        name: "keiro_research_pro",
        description: "Advanced research with detailed analysis, multiple perspectives, data visualizations, and comprehensive source evaluation. For complex research tasks.",
        endpoint: "/research-pro" /* Endpoint.ResearchPro */,
        paramKey: "query",
        inputSchema: {
            type: "object",
            properties: { query: { type: "string", description: "The research topic or question" } },
            required: ["query"],
        },
    },
    {
        name: "keiro_answer",
        description: "Get a direct, AI-powered answer to any question with inline source citations. Best for factual questions requiring authoritative responses.",
        endpoint: "/answer" /* Endpoint.Answer */,
        paramKey: "query",
        inputSchema: {
            type: "object",
            properties: { query: { type: "string", description: "The question to answer" } },
            required: ["query"],
        },
    },
    {
        name: "keiro_crawl",
        description: "Extract and parse content from any web page. Returns clean, structured text optimized for AI processing. Handles JavaScript-rendered pages.",
        endpoint: "/web-crawler" /* Endpoint.Crawler */,
        paramKey: "url",
        inputSchema: {
            type: "object",
            properties: { url: { type: "string", description: "The URL to crawl and extract content from" } },
            required: ["url"],
        },
    },
];
const toolMap = new Map(TOOL_REGISTRY.map((t) => [t.name, t]));
class KeiroClient {
    baseUrl;
    apiKey;
    controller;
    constructor() {
        const key = process.env.KEIRO_API_KEY;
        if (!key)
            throw new Error("KEIRO_API_KEY environment variable is required");
        this.apiKey = key;
        this.baseUrl = process.env.KEIRO_BASE_URL ?? "https://kierolabs.space/api";
        this.controller = new AbortController();
    }
    async execute(endpoint, params) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: this.apiKey, ...params }),
            signal: this.controller.signal,
        });
        if (!response.ok) {
            const body = await response.text().catch(() => "Unknown error");
            throw new Error(`API error ${response.status}: ${body}`);
        }
        return response.json();
    }
    abort() {
        this.controller.abort();
    }
}
function createMcpResponse(text, isError = false) {
    return { content: [{ type: "text", text }], ...(isError && { isError: true }) };
}
async function handleTool(client, name, args) {
    const tool = toolMap.get(name);
    if (!tool)
        return createMcpResponse(`Unknown tool: ${name}`, true);
    try {
        const param = args[tool.paramKey];
        if (typeof param !== "string" || !param.trim()) {
            return createMcpResponse(`Missing or invalid ${tool.paramKey}`, true);
        }
        const data = await client.execute(tool.endpoint, { [tool.paramKey]: param });
        return createMcpResponse(JSON.stringify(data, null, 2));
    }
    catch (e) {
        return createMcpResponse(e instanceof Error ? e.message : String(e), true);
    }
}
const server = new Server({ name: "keiro-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOL_REGISTRY.map(({ name, description, inputSchema }) => ({
        name,
        description,
        inputSchema,
    })),
}));
server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const client = new KeiroClient();
    return handleTool(client, req.params.name, (req.params.arguments ?? {}));
});
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
server.connect(new StdioServerTransport()).then(() => {
    console.error("🚀 KEIRO MCP Server v1.0.0");
});
//# sourceMappingURL=index.js.map