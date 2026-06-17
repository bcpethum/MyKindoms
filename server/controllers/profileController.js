import Profile from "../models/Profile.js";

export const getProfile = async (
  req,
  res
) => {
  try {
    const profile =
      await Profile.findOne();

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile =
  async (req, res) => {
    try {
      const profile =
        await Profile.findOneAndUpdate(
          {},
          req.body,
          {
            new: true,
            upsert: true,
          }
        );

      res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };