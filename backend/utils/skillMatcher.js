const skills = [
  "java",
  "python",
  "javascript",
  "typescript",
  "c",
  "c++",
  "c#",
  "html",
  "css",
  "react",
  "react.js",
  "node.js",
  "nodejs",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "sql",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "git",
  "github",
  "spring",
  "spring boot",
  "hibernate",
  "angular",
  "vue",
  "next.js",
  "tensorflow",
  "pytorch",
  "scikit-learn",
  "machine learning",
  "deep learning",
  "data science",
  "rest api",
  "restful api",
  "microservices",
  "linux",
  "firebase",
  "figma"
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function skillExists(text, skill) {
  const normalizedSkill = normalizeText(skill);

  const escapedSkill = normalizedSkill.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const pattern = new RegExp(
    `(^|\\s)${escapedSkill}(?=\\s|$)`,
    "i"
  );

  return pattern.test(text);
}

function extractSkills(text) {
  const normalizedText = normalizeText(text);

  return skills.filter((skill) =>
    skillExists(normalizedText, skill)
  );
}

function calculateMatch(resumeText, jobDescription) {
  const resumeSkills = extractSkills(resumeText);
  const requiredSkills = extractSkills(jobDescription);

  const matchedSkills = requiredSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );

  const matchPercentage =
    requiredSkills.length > 0
      ? Math.round(
          (matchedSkills.length /
            requiredSkills.length) *
            100
        )
      : 0;

  return {
    resumeSkills,
    requiredSkills,
    matchedSkills,
    missingSkills,
    matchPercentage
  };
}

module.exports = {
  extractSkills,
  calculateMatch
};