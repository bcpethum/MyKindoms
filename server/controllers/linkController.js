import Link from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find()
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createLink = async (req, res) => {
  try {
    const {
      title,
      url,
      icon,
      order
    } = req.body;

    const link = await Link.create({
      title,
      url,
      icon,
      order
    });

    res.status(201).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLink = async (
  req,
  res
) => {
  try {
    const link =
      await Link.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLink = async (
  req,
  res
) => {
  try {
    await Link.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Link deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const trackClick = async (
  req,
  res
) => {
  try {
    const link = await Link.findById(
      req.params.id
    );

    if (!link) {
      return res.status(404).json({
        success: false,
      });
    }

    link.clicks += 1;

    await link.save();

    res.status(200).json({
      success: true,
      redirectUrl: link.url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};