from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi import status
import os
import requests
from pathlib import Path
import uuid

router = APIRouter()

IMAGE_PROVIDER = os.getenv("IMAGE_PROVIDER", "imgbb")
IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")
IMGSRC_UPLOAD_URL = os.getenv("IMGSRC_UPLOAD_URL", "https://i.imgsrc.ru/upload/")

@router.post("/articles/upload-preview")
async def upload_preview(file: UploadFile = File(...)):
    content = await file.read()
    filename = file.filename or f"{uuid.uuid4().hex}.jpg"

    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    if IMAGE_PROVIDER == "imgbb":
        if not IMGBB_API_KEY:
            raise HTTPException(status_code=500, detail="IMGBB_API_KEY not set on server")

        resp = requests.post(
            f"https://api.imgbb.com/1/upload?key={IMGBB_API_KEY}",
            files={"image": (filename, content, file.content_type)}
        )

        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail="Image host returned error")

        data = resp.json()
        url = data.get("data", {}).get("url")
        if not url:
            raise HTTPException(status_code=502, detail="No URL returned from image host")
        return {"url": url}

    elif IMAGE_PROVIDER == "imgsrc":
        try:
            resp = requests.post(IMGSRC_UPLOAD_URL, files={"file": (filename, content, file.content_type)}, timeout=30)
        except Exception:
            resp = None

        if resp is not None and resp.status_code in (200, 201, 302):
            try:
                j = resp.json()
                url = j.get("url") or j.get("link") or j.get("data", {}).get("url")
                if url:
                    return {"url": url}
            except Exception:
                url = resp.headers.get("Location")
                if url:
                    return {"url": url}

        uploads_dir = Path("uploads/articles")
        uploads_dir.mkdir(parents=True, exist_ok=True)
        local_name = f"{uuid.uuid4().hex}_{filename}"
        p = uploads_dir / local_name
        p.write_bytes(content)
        return {"url": f"/static/articles/{local_name}"}

    else:
        raise HTTPException(status_code=500, detail="Unsupported IMAGE_PROVIDER")
