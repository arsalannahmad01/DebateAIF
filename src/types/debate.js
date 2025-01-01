/**
 * @typedef {Object} Argument
 * @property {string} content - The argument content
 * @property {string} type - Type of argument ('opening' or 'rebuttal')
 * @property {string} timestamp - When the argument was made
 * @property {string} side - Which side made the argument ('user' or 'ai')
 * @property {string} stance - The stance taken ('in favour' or 'against')
 */

/**
 * @typedef {Object} Debate
 * @property {string} id - Unique identifier for the debate
 * @property {string} title - Title of the debate
 * @property {string} topic - Main topic of the debate
 * @property {string} category - Category the debate belongs to
 * @property {string} status - Current status of the debate
 * @property {string} difficulty - Difficulty level
 * @property {number} duration - Duration in minutes
 * @property {string} userId - ID of the user
 * @property {string} stance - The stance for this debate ('in favour' or 'against')
 * @property {Array<Argument>} userArguments - User's arguments
 * @property {Array<Argument>} aiArguments - AI's arguments
 * @property {Array<string>} tags - Debate tags
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} CreateDebateRequest
 * @property {string} title - Title of the debate
 * @property {string} topic - Main topic of the debate
 * @property {string} category - Category the debate belongs to
 * @property {string} difficulty - Difficulty level of the debate
 * @property {number} duration - Duration of the debate in minutes
 * @property {Array<string>} tags - Array of tags associated with the debate
 */ 