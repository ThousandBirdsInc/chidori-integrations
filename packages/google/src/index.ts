import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface GeminiGenerateContentArgs {
  contents: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  systemInstruction?: JsonObject;
  generationConfig?: JsonObject;
  safetySettings?: JsonObject[];
  tools?: JsonObject[];
}

export interface GeminiEmbedContentArgs {
  content: JsonObject;
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  taskType?: string;
  title?: string;
  outputDimensionality?: number;
}

export interface VertexGenerateContentArgs {
  contents: JsonObject[];
  accessToken?: SecretInput;
  project: string;
  location?: string;
  model?: string;
  baseUrl?: string;
  systemInstruction?: JsonObject;
  generationConfig?: JsonObject;
  safetySettings?: JsonObject[];
  tools?: JsonObject[];
}

export interface GooglePlacesTextSearchArgs {
  textQuery: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  fieldMask?: string;
  languageCode?: string;
  regionCode?: string;
  includedType?: string;
  openNow?: boolean;
  minRating?: number;
  maxResultCount?: number;
  priceLevels?: string[];
  rankPreference?: "RELEVANCE" | "DISTANCE";
  locationBias?: JsonObject;
  locationRestriction?: JsonObject;
  strictTypeFiltering?: boolean;
}

export interface GoogleRoutesComputeArgs {
  origin: JsonObject;
  destination: JsonObject;
  apiKey?: SecretInput;
  baseUrl?: string;
  fieldMask?: string;
  intermediates?: JsonObject[];
  travelMode?: "DRIVE" | "BICYCLE" | "WALK" | "TWO_WHEELER" | "TRANSIT";
  routingPreference?: "TRAFFIC_UNAWARE" | "TRAFFIC_AWARE" | "TRAFFIC_AWARE_OPTIMAL";
  polylineQuality?: "OVERVIEW" | "HIGH_QUALITY";
  polylineEncoding?: "ENCODED_POLYLINE" | "GEO_JSON_LINESTRING";
  departureTime?: string;
  arrivalTime?: string;
  computeAlternativeRoutes?: boolean;
  routeModifiers?: JsonObject;
  languageCode?: string;
  regionCode?: string;
  units?: "METRIC" | "IMPERIAL";
}

export interface GoogleYoutubeSearchArgs {
  query?: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  part?: string;
  type?: "video" | "channel" | "playlist";
  channelId?: string;
  channelType?: "any" | "show";
  eventType?: "completed" | "live" | "upcoming";
  location?: string;
  locationRadius?: string;
  maxResults?: number;
  order?: "date" | "rating" | "relevance" | "title" | "videoCount" | "viewCount";
  pageToken?: string;
  publishedAfter?: string;
  publishedBefore?: string;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: "moderate" | "none" | "strict";
  topicId?: string;
  videoCaption?: "any" | "closedCaption" | "none";
  videoCategoryId?: string;
  videoDefinition?: "any" | "high" | "standard";
  videoDimension?: "2d" | "3d" | "any";
  videoDuration?: "any" | "long" | "medium" | "short";
  videoEmbeddable?: "any" | "true";
  videoLicense?: "any" | "creativeCommon" | "youtube";
  videoSyndicated?: "any" | "true";
  videoType?: "any" | "episode" | "movie";
}

export interface GoogleTextToSpeechSynthesizeArgs {
  text?: string;
  ssml?: string;
  accessToken?: SecretInput;
  apiKey?: SecretInput;
  baseUrl?: string;
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL";
  audioEncoding?: "LINEAR16" | "MP3" | "OGG_OPUS" | "MULAW" | "ALAW";
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
  sampleRateHertz?: number;
  effectsProfileId?: string[];
  advancedVoiceOptions?: JsonObject;
}

export interface GoogleTextToSpeechVoicesListArgs {
  accessToken?: SecretInput;
  apiKey?: SecretInput;
  baseUrl?: string;
  languageCode?: string;
}

export interface GoogleCalendarEventsListArgs {
  calendarId: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  maxResults?: number;
  timeMin?: string;
  timeMax?: string;
  q?: string;
  singleEvents?: boolean;
  orderBy?: "startTime" | "updated";
  pageToken?: string;
  showDeleted?: boolean;
  timeZone?: string;
}

export interface GoogleCalendarEventInsertArgs {
  calendarId: string;
  event: JsonObject;
  accessToken?: SecretInput;
  baseUrl?: string;
  conferenceDataVersion?: number;
  sendUpdates?: "all" | "externalOnly" | "none";
  supportsAttachments?: boolean;
}

export interface GoogleGmailMessagesListArgs {
  userId?: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  q?: string;
  labelIds?: string[];
  maxResults?: number;
  pageToken?: string;
  includeSpamTrash?: boolean;
}

export interface GoogleGmailMessageGetArgs {
  id: string;
  userId?: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  format?: "minimal" | "full" | "raw" | "metadata";
  metadataHeaders?: string[];
}

export interface GoogleGmailMessageSendArgs {
  raw: string;
  userId?: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  threadId?: string;
}

export interface GoogleGmailDraftCreateArgs {
  raw: string;
  userId?: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  threadId?: string;
}

export interface GoogleGmailThreadGetArgs {
  id: string;
  userId?: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  format?: "minimal" | "full" | "metadata";
  metadataHeaders?: string[];
}

function cleanBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

function gmailUserUrl(baseUrl: string | undefined, userId: string | undefined, path: string): string {
  return `${cleanBaseUrl(baseUrl ?? "https://gmail.googleapis.com/gmail/v1")}/users/${encodeURIComponent(userId ?? "me")}/${path}`;
}

async function googleTextToSpeechAuth(
  chidori: Parameters<typeof requestJson<JsonObject>>[0],
  accessToken?: SecretInput,
  apiKey?: SecretInput,
): Promise<{ accessToken?: string; apiKey?: string }> {
  if (accessToken) {
    return { accessToken: await resolveSecret(accessToken, chidori, "Google OAuth access token") };
  }
  return { apiKey: await resolveSecret(apiKey, chidori, "Google Cloud API key") };
}

export const googleGeminiGenerateContentTool = defineTool<GeminiGenerateContentArgs, JsonObject>(
  {
    name: "google_gemini_generate_content",
    description: "Generate content with the Google Gemini API.",
    parameters: {
      type: "object",
      properties: {
        contents: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Gemini API key or Chidori memory secret reference." },
        model: { type: "string", default: "gemini-1.5-flash" },
        baseUrl: { type: "string", description: "Gemini API base URL." },
        systemInstruction: { type: "object", additionalProperties: true },
        generationConfig: { type: "object", additionalProperties: true },
        safetySettings: { type: "array", items: { type: "object", additionalProperties: true } },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["contents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Google Gemini API key");
    const model = encodeURIComponent(args.model ?? "gemini-1.5-flash");
    const url = withQuery(`${args.baseUrl ?? "https://generativelanguage.googleapis.com/v1beta"}/models/${model}:generateContent`, {
      key: apiKey,
    });
    const body = compactObject({
      contents: args.contents as Json,
      system_instruction: args.systemInstruction,
      generationConfig: args.generationConfig,
      safetySettings: args.safetySettings,
      tools: args.tools,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, url, {
      method: "POST",
      headers: jsonHeaders(),
      body,
    });
  },
);

export const googleGeminiEmbedContentTool = defineTool<GeminiEmbedContentArgs, JsonObject>(
  {
    name: "google_gemini_embed_content",
    description: "Create embeddings with the Google Gemini API.",
    parameters: {
      type: "object",
      properties: {
        content: { type: "object", additionalProperties: true },
        apiKey: { description: "Gemini API key or Chidori memory secret reference." },
        model: { type: "string", default: "text-embedding-004" },
        baseUrl: { type: "string" },
        taskType: { type: "string" },
        title: { type: "string" },
        outputDimensionality: { type: "integer" },
      },
      required: ["content"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Google Gemini API key");
    const model = encodeURIComponent(args.model ?? "text-embedding-004");
    const url = withQuery(`${args.baseUrl ?? "https://generativelanguage.googleapis.com/v1beta"}/models/${model}:embedContent`, {
      key: apiKey,
    });
    const body = compactObject({
      model: `models/${args.model ?? "text-embedding-004"}`,
      content: args.content,
      taskType: args.taskType,
      title: args.title,
      outputDimensionality: args.outputDimensionality,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, url, {
      method: "POST",
      headers: jsonHeaders(),
      body,
    });
  },
);

export const googleVertexGenerateContentTool = defineTool<VertexGenerateContentArgs, JsonObject>(
  {
    name: "google_vertex_generate_content",
    description: "Generate content with Vertex AI Gemini.",
    parameters: {
      type: "object",
      properties: {
        contents: { type: "array", items: { type: "object", additionalProperties: true } },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        project: { type: "string", description: "Google Cloud project ID." },
        location: { type: "string", default: "us-central1" },
        model: { type: "string", default: "gemini-1.5-flash" },
        baseUrl: { type: "string" },
        systemInstruction: { type: "object", additionalProperties: true },
        generationConfig: { type: "object", additionalProperties: true },
        safetySettings: { type: "array", items: { type: "object", additionalProperties: true } },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["contents", "project"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    const location = args.location ?? "us-central1";
    const model = encodeURIComponent(args.model ?? "gemini-1.5-flash");
    const baseUrl = args.baseUrl ?? `https://${location}-aiplatform.googleapis.com/v1`;
    const url = `${baseUrl}/projects/${encodeURIComponent(args.project)}/locations/${encodeURIComponent(location)}/publishers/google/models/${model}:generateContent`;
    const body = compactObject({
      contents: args.contents as Json,
      system_instruction: args.systemInstruction,
      generationConfig: args.generationConfig,
      safetySettings: args.safetySettings,
      tools: args.tools,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, url, {
      method: "POST",
      headers: jsonHeaders(bearerAuth(accessToken)),
      body,
    });
  },
);

export const googlePlacesTextSearchTool = defineTool<GooglePlacesTextSearchArgs, JsonObject>(
  {
    name: "google_places_text_search",
    description: "Find places with the Google Places API Text Search endpoint.",
    parameters: {
      type: "object",
      properties: {
        textQuery: { type: "string", description: "Text query, such as pizza in New York." },
        apiKey: { description: "Google Maps Platform API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://places.googleapis.com/v1/places:searchText" },
        fieldMask: { type: "string", description: "X-Goog-FieldMask value." },
        languageCode: { type: "string" },
        regionCode: { type: "string" },
        includedType: { type: "string" },
        openNow: { type: "boolean" },
        minRating: { type: "number" },
        maxResultCount: { type: "integer", default: 10 },
        priceLevels: { type: "array", items: { type: "string" } },
        rankPreference: { type: "string", enum: ["RELEVANCE", "DISTANCE"] },
        locationBias: { type: "object", additionalProperties: true },
        locationRestriction: { type: "object", additionalProperties: true },
        strictTypeFiltering: { type: "boolean" },
      },
      required: ["textQuery"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Google Maps Platform API key");
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: jsonHeaders({
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": args.fieldMask ?? "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.websiteUri",
      }),
      body: compactObject({
        textQuery: args.textQuery,
        languageCode: args.languageCode,
        regionCode: args.regionCode,
        includedType: args.includedType,
        openNow: args.openNow,
        minRating: args.minRating,
        maxResultCount: args.maxResultCount ?? 10,
        priceLevels: args.priceLevels,
        rankPreference: args.rankPreference,
        locationBias: args.locationBias,
        locationRestriction: args.locationRestriction,
        strictTypeFiltering: args.strictTypeFiltering,
      }) as JsonObject,
    });
  },
);

export const googleRoutesComputeTool = defineTool<GoogleRoutesComputeArgs, JsonObject>(
  {
    name: "google_routes_compute",
    description: "Compute routes with the Google Routes API.",
    parameters: {
      type: "object",
      properties: {
        origin: { type: "object", additionalProperties: true },
        destination: { type: "object", additionalProperties: true },
        apiKey: { description: "Google Maps Platform API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://routes.googleapis.com/directions/v2:computeRoutes" },
        fieldMask: { type: "string", description: "X-Goog-FieldMask value." },
        intermediates: { type: "array", items: { type: "object", additionalProperties: true } },
        travelMode: { type: "string", enum: ["DRIVE", "BICYCLE", "WALK", "TWO_WHEELER", "TRANSIT"] },
        routingPreference: { type: "string", enum: ["TRAFFIC_UNAWARE", "TRAFFIC_AWARE", "TRAFFIC_AWARE_OPTIMAL"] },
        polylineQuality: { type: "string", enum: ["OVERVIEW", "HIGH_QUALITY"] },
        polylineEncoding: { type: "string", enum: ["ENCODED_POLYLINE", "GEO_JSON_LINESTRING"] },
        departureTime: { type: "string" },
        arrivalTime: { type: "string" },
        computeAlternativeRoutes: { type: "boolean" },
        routeModifiers: { type: "object", additionalProperties: true },
        languageCode: { type: "string" },
        regionCode: { type: "string" },
        units: { type: "string", enum: ["METRIC", "IMPERIAL"] },
      },
      required: ["origin", "destination"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Google Maps Platform API key");
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: jsonHeaders({
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": args.fieldMask ?? "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      }),
      body: compactObject({
        origin: args.origin,
        destination: args.destination,
        intermediates: args.intermediates as Json | undefined,
        travelMode: args.travelMode,
        routingPreference: args.routingPreference,
        polylineQuality: args.polylineQuality,
        polylineEncoding: args.polylineEncoding,
        departureTime: args.departureTime,
        arrivalTime: args.arrivalTime,
        computeAlternativeRoutes: args.computeAlternativeRoutes,
        routeModifiers: args.routeModifiers,
        languageCode: args.languageCode,
        regionCode: args.regionCode,
        units: args.units,
      }) as JsonObject,
    });
  },
);

export const googleYoutubeSearchTool = defineTool<GoogleYoutubeSearchArgs, JsonObject>(
  {
    name: "google_youtube_search",
    description: "Search YouTube videos, channels, or playlists with the YouTube Data API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "YouTube Data API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.googleapis.com/youtube/v3/search" },
        part: { type: "string", default: "snippet" },
        type: { type: "string", enum: ["video", "channel", "playlist"], default: "video" },
        channelId: { type: "string" },
        channelType: { type: "string", enum: ["any", "show"] },
        eventType: { type: "string", enum: ["completed", "live", "upcoming"] },
        location: { type: "string", description: "Latitude and longitude, for example 37.42307,-122.08427." },
        locationRadius: { type: "string", description: "Radius with unit, for example 10km." },
        maxResults: { type: "integer", default: 5, minimum: 0, maximum: 50 },
        order: { type: "string", enum: ["date", "rating", "relevance", "title", "videoCount", "viewCount"] },
        pageToken: { type: "string" },
        publishedAfter: { type: "string", description: "RFC 3339 timestamp lower bound." },
        publishedBefore: { type: "string", description: "RFC 3339 timestamp upper bound." },
        regionCode: { type: "string" },
        relevanceLanguage: { type: "string" },
        safeSearch: { type: "string", enum: ["moderate", "none", "strict"] },
        topicId: { type: "string" },
        videoCaption: { type: "string", enum: ["any", "closedCaption", "none"] },
        videoCategoryId: { type: "string" },
        videoDefinition: { type: "string", enum: ["any", "high", "standard"] },
        videoDimension: { type: "string", enum: ["2d", "3d", "any"] },
        videoDuration: { type: "string", enum: ["any", "long", "medium", "short"] },
        videoEmbeddable: { type: "string", enum: ["any", "true"] },
        videoLicense: { type: "string", enum: ["any", "creativeCommon", "youtube"] },
        videoSyndicated: { type: "string", enum: ["any", "true"] },
        videoType: { type: "string", enum: ["any", "episode", "movie"] },
      },
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "YouTube Data API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://www.googleapis.com/youtube/v3/search", {
      key: apiKey,
      part: args.part ?? "snippet",
      q: args.query,
      type: args.type ?? "video",
      channelId: args.channelId,
      channelType: args.channelType,
      eventType: args.eventType,
      location: args.location,
      locationRadius: args.locationRadius,
      maxResults: args.maxResults ?? 5,
      order: args.order,
      pageToken: args.pageToken,
      publishedAfter: args.publishedAfter,
      publishedBefore: args.publishedBefore,
      regionCode: args.regionCode,
      relevanceLanguage: args.relevanceLanguage,
      safeSearch: args.safeSearch,
      topicId: args.topicId,
      videoCaption: args.videoCaption,
      videoCategoryId: args.videoCategoryId,
      videoDefinition: args.videoDefinition,
      videoDimension: args.videoDimension,
      videoDuration: args.videoDuration,
      videoEmbeddable: args.videoEmbeddable,
      videoLicense: args.videoLicense,
      videoSyndicated: args.videoSyndicated,
      videoType: args.videoType,
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const googleTextToSpeechSynthesizeTool = defineTool<GoogleTextToSpeechSynthesizeArgs, JsonObject>(
  {
    name: "google_text_to_speech_synthesize",
    description: "Synthesize speech with Google Cloud Text-to-Speech and return the base64-encoded audio response.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string", description: "Plain text to synthesize. Required unless ssml is provided." },
        ssml: { type: "string", description: "SSML to synthesize. Required unless text is provided." },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        apiKey: { description: "Google Cloud API key or Chidori memory secret reference. Used when accessToken is not provided." },
        baseUrl: { type: "string", default: "https://texttospeech.googleapis.com/v1" },
        languageCode: { type: "string", default: "en-US" },
        voiceName: { type: "string", description: "Specific voice name, for example en-US-Neural2-C." },
        ssmlGender: { type: "string", enum: ["SSML_VOICE_GENDER_UNSPECIFIED", "MALE", "FEMALE", "NEUTRAL"] },
        audioEncoding: { type: "string", enum: ["LINEAR16", "MP3", "OGG_OPUS", "MULAW", "ALAW"], default: "MP3" },
        speakingRate: { type: "number" },
        pitch: { type: "number" },
        volumeGainDb: { type: "number" },
        sampleRateHertz: { type: "integer" },
        effectsProfileId: { type: "array", items: { type: "string" } },
        advancedVoiceOptions: { type: "object", additionalProperties: true },
      },
    },
  },
  async (args, chidori) => {
    if (!args.text && !args.ssml) {
      throw new Error("google_text_to_speech_synthesize requires text or ssml");
    }
    const auth = await googleTextToSpeechAuth(chidori, args.accessToken, args.apiKey);
    const url = auth.apiKey
      ? withQuery(`${cleanBaseUrl(args.baseUrl ?? "https://texttospeech.googleapis.com/v1")}/text:synthesize`, { key: auth.apiKey })
      : `${cleanBaseUrl(args.baseUrl ?? "https://texttospeech.googleapis.com/v1")}/text:synthesize`;
    return requestJson<JsonObject>(chidori, url, {
      method: "POST",
      headers: jsonHeaders({
        ...(auth.accessToken ? bearerAuth(auth.accessToken) : {}),
      }),
      body: compactObject({
        input: args.ssml ? { ssml: args.ssml } : { text: args.text },
        voice: compactObject({
          languageCode: args.languageCode ?? "en-US",
          name: args.voiceName,
          ssmlGender: args.ssmlGender,
        }) as JsonObject,
        audioConfig: compactObject({
          audioEncoding: args.audioEncoding ?? "MP3",
          speakingRate: args.speakingRate,
          pitch: args.pitch,
          volumeGainDb: args.volumeGainDb,
          sampleRateHertz: args.sampleRateHertz,
          effectsProfileId: args.effectsProfileId as Json | undefined,
        }) as JsonObject,
        advancedVoiceOptions: args.advancedVoiceOptions,
      }) as JsonObject,
    });
  },
);

export const googleTextToSpeechVoicesListTool = defineTool<GoogleTextToSpeechVoicesListArgs, JsonObject>(
  {
    name: "google_text_to_speech_voices_list",
    description: "List Google Cloud Text-to-Speech voices, optionally filtered by language code.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        apiKey: { description: "Google Cloud API key or Chidori memory secret reference. Used when accessToken is not provided." },
        baseUrl: { type: "string", default: "https://texttospeech.googleapis.com/v1" },
        languageCode: { type: "string", description: "BCP-47 language code such as en-US." },
      },
    },
  },
  async (args, chidori) => {
    const auth = await googleTextToSpeechAuth(chidori, args.accessToken, args.apiKey);
    const url = withQuery(`${cleanBaseUrl(args.baseUrl ?? "https://texttospeech.googleapis.com/v1")}/voices`, {
      key: auth.apiKey,
      languageCode: args.languageCode,
    });
    return requestJson<JsonObject>(chidori, url, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...(auth.accessToken ? bearerAuth(auth.accessToken) : {}),
      },
    });
  },
);

export const googleCalendarEventsListTool = defineTool<GoogleCalendarEventsListArgs, JsonObject>(
  {
    name: "google_calendar_events_list",
    description: "List events from a Google Calendar.",
    parameters: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Calendar ID, such as primary." },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.googleapis.com/calendar/v3" },
        maxResults: { type: "integer", default: 10 },
        timeMin: { type: "string" },
        timeMax: { type: "string" },
        q: { type: "string" },
        singleEvents: { type: "boolean", default: true },
        orderBy: { type: "string", enum: ["startTime", "updated"] },
        pageToken: { type: "string" },
        showDeleted: { type: "boolean" },
        timeZone: { type: "string" },
      },
      required: ["calendarId"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    const url = withQuery(`${cleanBaseUrl(args.baseUrl ?? "https://www.googleapis.com/calendar/v3")}/calendars/${encodeURIComponent(args.calendarId)}/events`, {
      maxResults: args.maxResults ?? 10,
      timeMin: args.timeMin,
      timeMax: args.timeMax,
      q: args.q,
      singleEvents: args.singleEvents ?? true,
      orderBy: args.orderBy,
      pageToken: args.pageToken,
      showDeleted: args.showDeleted,
      timeZone: args.timeZone,
    });
    return requestJson<JsonObject>(chidori, url, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...bearerAuth(accessToken),
      },
    });
  },
);

export const googleCalendarEventInsertTool = defineTool<GoogleCalendarEventInsertArgs, JsonObject>(
  {
    name: "google_calendar_event_insert",
    description: "Insert an event into a Google Calendar.",
    parameters: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Calendar ID, such as primary." },
        event: { type: "object", additionalProperties: true },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.googleapis.com/calendar/v3" },
        conferenceDataVersion: { type: "integer" },
        sendUpdates: { type: "string", enum: ["all", "externalOnly", "none"] },
        supportsAttachments: { type: "boolean" },
      },
      required: ["calendarId", "event"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    const url = withQuery(`${cleanBaseUrl(args.baseUrl ?? "https://www.googleapis.com/calendar/v3")}/calendars/${encodeURIComponent(args.calendarId)}/events`, {
      conferenceDataVersion: args.conferenceDataVersion,
      sendUpdates: args.sendUpdates,
      supportsAttachments: args.supportsAttachments,
    });
    return requestJson<JsonObject>(chidori, url, {
      method: "POST",
      headers: jsonHeaders(bearerAuth(accessToken)),
      body: args.event,
    });
  },
);

export const googleGmailMessagesListTool = defineTool<GoogleGmailMessagesListArgs, JsonObject>(
  {
    name: "google_gmail_messages_list",
    description: "Search or list Gmail messages for the authenticated user.",
    parameters: {
      type: "object",
      properties: {
        userId: { type: "string", default: "me" },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gmail.googleapis.com/gmail/v1" },
        q: { type: "string", description: "Gmail search query." },
        labelIds: { type: "array", items: { type: "string" } },
        maxResults: { type: "integer", default: 10 },
        pageToken: { type: "string" },
        includeSpamTrash: { type: "boolean" },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    return requestJson<JsonObject>(chidori, withQuery(gmailUserUrl(args.baseUrl, args.userId, "messages"), {
      q: args.q,
      labelIds: args.labelIds?.join(","),
      maxResults: args.maxResults ?? 10,
      pageToken: args.pageToken,
      includeSpamTrash: args.includeSpamTrash,
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
        ...bearerAuth(accessToken),
      },
    });
  },
);

export const googleGmailMessageGetTool = defineTool<GoogleGmailMessageGetArgs, JsonObject>(
  {
    name: "google_gmail_message_get",
    description: "Get a Gmail message by ID.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Gmail message ID." },
        userId: { type: "string", default: "me" },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gmail.googleapis.com/gmail/v1" },
        format: { type: "string", enum: ["minimal", "full", "raw", "metadata"], default: "full" },
        metadataHeaders: { type: "array", items: { type: "string" } },
      },
      required: ["id"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    return requestJson<JsonObject>(chidori, withQuery(gmailUserUrl(args.baseUrl, args.userId, `messages/${encodeURIComponent(args.id)}`), {
      format: args.format ?? "full",
      metadataHeaders: args.metadataHeaders?.join(","),
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
        ...bearerAuth(accessToken),
      },
    });
  },
);

export const googleGmailMessageSendTool = defineTool<GoogleGmailMessageSendArgs, JsonObject>(
  {
    name: "google_gmail_message_send",
    description: "Send a Gmail message using an API-ready base64url RFC 2822 raw message.",
    parameters: {
      type: "object",
      properties: {
        raw: { type: "string", description: "Base64url-encoded RFC 2822 message." },
        userId: { type: "string", default: "me" },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gmail.googleapis.com/gmail/v1" },
        threadId: { type: "string" },
      },
      required: ["raw"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    return requestJson<JsonObject>(chidori, gmailUserUrl(args.baseUrl, args.userId, "messages/send"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(accessToken)),
      body: compactObject({
        raw: args.raw,
        threadId: args.threadId,
      }) as JsonObject,
    });
  },
);

export const googleGmailDraftCreateTool = defineTool<GoogleGmailDraftCreateArgs, JsonObject>(
  {
    name: "google_gmail_draft_create",
    description: "Create a Gmail draft using an API-ready base64url RFC 2822 raw message.",
    parameters: {
      type: "object",
      properties: {
        raw: { type: "string", description: "Base64url-encoded RFC 2822 message." },
        userId: { type: "string", default: "me" },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gmail.googleapis.com/gmail/v1" },
        threadId: { type: "string" },
      },
      required: ["raw"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    return requestJson<JsonObject>(chidori, gmailUserUrl(args.baseUrl, args.userId, "drafts"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(accessToken)),
      body: {
        message: compactObject({
          raw: args.raw,
          threadId: args.threadId,
        }) as JsonObject,
      },
    });
  },
);

export const googleGmailThreadGetTool = defineTool<GoogleGmailThreadGetArgs, JsonObject>(
  {
    name: "google_gmail_thread_get",
    description: "Get a Gmail thread by ID.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Gmail thread ID." },
        userId: { type: "string", default: "me" },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gmail.googleapis.com/gmail/v1" },
        format: { type: "string", enum: ["minimal", "full", "metadata"], default: "full" },
        metadataHeaders: { type: "array", items: { type: "string" } },
      },
      required: ["id"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    return requestJson<JsonObject>(chidori, withQuery(gmailUserUrl(args.baseUrl, args.userId, `threads/${encodeURIComponent(args.id)}`), {
      format: args.format ?? "full",
      metadataHeaders: args.metadataHeaders?.join(","),
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
        ...bearerAuth(accessToken),
      },
    });
  },
);

export const googleTools = {
  geminiGenerateContent: googleGeminiGenerateContentTool,
  geminiEmbedContent: googleGeminiEmbedContentTool,
  vertexGenerateContent: googleVertexGenerateContentTool,
  placesTextSearch: googlePlacesTextSearchTool,
  routesCompute: googleRoutesComputeTool,
  youtubeSearch: googleYoutubeSearchTool,
  textToSpeechSynthesize: googleTextToSpeechSynthesizeTool,
  textToSpeechVoicesList: googleTextToSpeechVoicesListTool,
  calendarEventsList: googleCalendarEventsListTool,
  calendarEventInsert: googleCalendarEventInsertTool,
  gmailMessagesList: googleGmailMessagesListTool,
  gmailMessageGet: googleGmailMessageGetTool,
  gmailMessageSend: googleGmailMessageSendTool,
  gmailDraftCreate: googleGmailDraftCreateTool,
  gmailThreadGet: googleGmailThreadGetTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getGoogleEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "GOOGLE_GEMINI_API_KEY", description: "Google Gemini API key." },
    { name: "GOOGLE_CLOUD_API_KEY", description: "Google Cloud API key." },
    { name: "GOOGLE_OAUTH_ACCESS_TOKEN", description: "Google OAuth access token." },
    { name: "GOOGLE_MAPS_API_KEY", description: "Google Maps Platform API key." },
    { name: "YOUTUBE_API_KEY", description: "YouTube Data API key." },
  ];
}

export const googleIntegrationSpec = {
  environmentVariables: getGoogleEnvironmentVariables,
} satisfies IntegrationSpec;
